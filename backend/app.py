from flask import Flask, request, jsonify
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import json
from flask_cors import CORS
from unet_model import UNet
import numpy as np
import cv2
import os
from flask import send_from_directory
from keras.models import load_model
from tensorflow.keras.applications.efficientnet import preprocess_input

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
@app.route('/mask_output/<filename>')
def get_mask(filename):
    return send_from_directory('mask_output', filename)


with open("class_info.json") as f:
    class_info = json.load(f)
class_names = class_info["classes"]

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_pytorch_model():
    model = models.resnet50(weights=None)
    in_features = model.fc.in_features

    model.fc = nn.Sequential(
        nn.Dropout(0.2),
        nn.Linear(in_features, 512),
        nn.ReLU(),
        nn.BatchNorm1d(512),
        nn.Dropout(0.2),
        nn.Linear(512, len(class_names))
    )

    checkpoint = torch.load("model/best_model1.h5", map_location=device)



    # Load U-Net model
    unet_model = UNet().to(device)

    unet_model.load_state_dict(torch.load(
            "model/brain_tumor_model.pth",
            map_location=device
        )
    )

    unet_model.eval()

    if "model_state_dict" in checkpoint:
        checkpoint = checkpoint["model_state_dict"]

    model.load_state_dict(checkpoint)
    model.to(device)
    model.eval()
    return model, unet_model

model, unet_model = load_pytorch_model()


# Load Batch Classification Model
batch_model = load_model("model/brain_tumor_model.h5",compile=False)


transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])


@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["image"]
    image = Image.open(file).convert("RGB")

    input_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(input_tensor)
        prob = torch.nn.functional.softmax(output[0], dim=0)

    conf, idx = torch.max(prob, 0)


    predicted_class = class_names[idx.item()]

    delete_mask = "mask_output/mask_output.png"

    # delete old mask if exists
    if os.path.exists(delete_mask):
        os.remove(delete_mask)

    if predicted_class !='notumor':
        
        # U-Net prediction
        with torch.no_grad():

            # grayscale image for U-Net
            gray_img = image.convert("L")
            gray_img = gray_img.resize((128, 128))

            img_array = np.array(gray_img) / 255.0

            unet_input = torch.tensor(img_array) \
                .unsqueeze(0) \
                .unsqueeze(0) \
                .float() \
                .to(device)

            mask_pred = unet_model(unet_input)

        mask_pred = mask_pred.squeeze().cpu().numpy()

        mask_binary = (mask_pred > 0.5).astype(np.uint8)

        # Save mask image
        mask_image = (mask_binary * 255).astype(np.uint8)
        

        cv2.imwrite(delete_mask, mask_image)

    return jsonify({
        "predicted_class": class_names[idx.item()],
        "confidence": float(conf.item() * 100),
        "probabilities": prob.tolist(),
        "mask_image": delete_mask if predicted_class != "notumor" else None
    })


@app.route("/batch_predict", methods=["POST"])
def batch_predict():

    files = request.files.getlist("images")

    if len(files) == 0:
        return jsonify({"error": "No images uploaded"}), 400

    results = []

    for file in files:

        image = Image.open(file).convert("RGB")

        image = image.resize((300, 300))

        img_array = np.array(image, dtype=np.float32)

        # EfficientNet preprocessing
        img_array = preprocess_input(img_array)

        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)

        prediction = batch_model.predict(img_array, verbose=0)

        confidence = float(prediction[0][0])

        if confidence > 0.5:
            predicted_class = "tumor"
        else:
            predicted_class = "notumor"

        results.append({
            "filename": file.filename,
            "predicted_class": predicted_class
        })

    return jsonify({
        "results": results
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)