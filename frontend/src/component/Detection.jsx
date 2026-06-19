import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../helper/axiosHelper";
import { FaCamera } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";

const Detection = () => {
  const fileInputRef = useRef();
  const { control } = useForm();
  const [originalImage, setOriginalImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animatedWidths, setAnimatedWidths] = useState([]);

  const classNames = ["Glioma", "Meningioma", "No Tumor", "Pituitary"];

  // Handle image preview
  const handlePreview = (e) => {
    const file = e.target.files[0];
    setOriginalImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // Analyze the uploaded image
  const analyze = async () => {
    setLoading(true);
    
    // Delay the API call for a loading effect
    const timer=setTimeout(async () => {
      const form = new FormData();
      form.append("image", originalImage);

      try {
        const res = await axiosInstance.post("/predict", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setResult(res.data);
        setLoading(false);
      } 
      catch (error) 
      {
        console.error("Error during the prediction:", error);
        setLoading(false);
      }
    },2000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (result?.probabilities) {
      // Set initial widths to 0% for animation
      setAnimatedWidths(result.probabilities.map(() => 0));

      // Animate the confidence bars after 200ms
      setTimeout(() => {
        setAnimatedWidths(result.probabilities.map((p) => p * 100));
      }, 700);
    }
  }, [result]);

  // Reset all fields
  const reset = () => {
    setPreview(null);
    setOriginalImage(null);
    setResult(null);
    setAnimatedWidths([]);
    setLoading(false);
  };

  // Normalize the backend labels
  const normalizeClass = (cls) => {
    const lower = cls.toLowerCase().replace(/\s/g, "");
    if (lower === "notumor") return "No Tumor";
    if (lower === "glioma") return "Glioma";
    if (lower === "meningioma") return "Meningioma";
    if (lower === "pituitary") return "Pituitary";
    return cls;
  };

  // Medical advice based on prediction
  const getAdvice = (tumor) => {
    const advice = {
      Glioma: "Gliomas require urgent neurologist review.",
      Meningioma: "Usually benign. Consult neurosurgeon.",
      Pituitary: "Consult endocrine + neurosurgical specialist.",
    };
    return advice[tumor] || "Consult a medical expert.";
  };

  return (
    <div className="p-3 sm:pt-28 pt-32 z-10 bg-gradient-to-r from-[#5a7de0] via-[#6c63d9] to-[#6f52c8] text-white min-h-screen">
      <h1 className="text-xl text-center font-bold mb-14">
        Brain Tumor Classification & Detection
      </h1>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* LEFT PANEL */}
        <div className="w-full sm:w-1/3 flex justify-center">
          <div
            className="border-2 bg-gray-400 border-black relative w-full max-w-xs sm:max-w-sm aspect-square rounded-md h-fit"
          >
            {preview? (
              <div className="relative w-full h-fit">
                <img
                  src={preview}
                  className="w-full h-full rounded-md object-cover"
                  alt="Preview"
                />

                {result?.mask_image && (
                  <img
                    src={`http://127.0.0.1:5000/${result.mask_image}`}
                    alt="Mask Overlay"
                    className="absolute top-0 left-0 w-full h-full object-cover bg-red-500"
                    style={{
                      mixBlendMode: "multiply",
                      opacity: 0.8,
                      filter: "invert(1) sepia(1) saturate(1000%) hue-rotate(-50deg)"
                    }}
                  />
                )}

              </div>
            ):(
              <div
                className="absolute cursor-pointer inset-0 flex items-center justify-center"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="w-20 h-20 rounded-full border-4 border-black flex items-center justify-center">
                  <FaCamera size={40} className="text-white hover:text-purple-500" />
                </div>
              </div>
            )}

            <Controller
              name="brainImage"
              control={control}
              defaultValue={null}
              render={({ field: { onChange } }) => (
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => onChange(handlePreview(e))}
                />
              )}
            />

            {!preview && (
              <div className="bg-black w-fit rounded-md text-center absolute right-2 bottom-2">
                <p className="text-white text-sm p-1">Load MRI Scan</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="sm:w-2/3 bg-[#181818] p-6 rounded-lg shadow-lg z-10">
          <h2 className="text-xl text-center font-bold mb-4">
            Analysis Summary
          </h2>
          <button
            onClick={reset}
            disabled={!preview}
            className={`border-1 mb-3 w-full px-4 py-3 rounded-md font-bold ${
              preview ? "bg-red-400 text-white cursor-pointer hover:bg-red-500" : "bg-gray-700 opacity-50 cursor-not-allowed"
            }`}
          >
            Reset
          </button>
          <button
            onClick={analyze}
            disabled={!preview}
            className={`w-full py-3 border-1 rounded font-bold ${
              preview && !loading ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-700 opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="spinner-border animate-spin h-5 w-5 border-t-2 border-b-2 rounded-full"></div>
                <span className="text-sm font-medium">Processing...</span>
              </div>
            ) : (
              "🔍 Analyze Tumor"
            )}
          </button>

          {/* RESULTS */}
          <div className="mt-6 bg-[#0f0f0f] p-4 rounded-lg">
            {!result ? (
              <p className="text-red-500 text-center animate-pulse">
                Load an image to see Report.
              </p>
            ) : (
              (() => {
                const predictedClass = normalizeClass(result.predicted_class);
                const confidence = result.confidence.toFixed(2);

                return (
                  <>
                    <h2
                      className={`text-2xl font-bold text-center ${
                        predictedClass === "No Tumor" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {predictedClass}
                    </h2>

                    <h3
                      className={`text-lg text-center ${
                        predictedClass === "No Tumor" ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      Confidence: {confidence}%
                    </h3>

                    {/* Confidence Bars */}
                    <div className="mt-4">
                      {result.probabilities.map((p, idx) => (
                        <div key={idx} className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{classNames[idx]}</span>
                            <span>{(p * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-800 h-3 rounded">
                            <div
                              className="h-3 rounded transition-all duration-700 ease-out"
                              style={{
                                width: `${animatedWidths[idx]}%`,
                                background:
                                  classNames[idx] === predictedClass
                                    ? predictedClass === "No Tumor"
                                      ? "#4CAF50"
                                      : "#ff4444"
                                    : "#555",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Medical Advice */}
                    {predictedClass !== "No Tumor" && (
                      <div className="mt-4 p-3 bg-red-600 rounded text-white text-sm">
                        <b className="text-lg">⚠️ Medical Advice</b>
                        <p>{getAdvice(predictedClass)}</p>
                      </div>
                    )}

                    {/* Display Grad-CAM */}
                    {result.grad_cam_image && (
                      <div className="mt-4">
                        <h3 className="text-center text-lg text-white">Grad-CAM Visualization</h3>
                        <img
                          src={`data:image/png;base64,${result.grad_cam_image}`}
                          alt="Grad-CAM"
                          className="w-full rounded-md mt-2"
                        />
                      </div>
                    )}
                  </>
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detection;