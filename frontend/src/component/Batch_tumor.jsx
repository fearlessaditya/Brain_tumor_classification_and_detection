import React, { useRef, useState } from "react";
import axiosInstance from "../helper/axiosHelper";
import { Upload, Brain, CheckCircle2, AlertTriangle, X } from "lucide-react";

const BatchDetection = () => {
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages(previews);
    setResults([]);
  };

  const analyzeImages = async () => {
    if (images.length === 0) return;

    try {
      setLoading(true);

      const formData = new FormData();

      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await axiosInstance.post("/batch_predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResults(res.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setImages([]);
    setPreviewImages([]);
    setResults([]);
    setLoading(false);
  };

  const tumorResults = results.filter(
    (item) => item.predicted_class.toLowerCase() !== "notumor"
  );

  const noTumorResults = results.filter(
    (item) => item.predicted_class.toLowerCase() === "notumor"
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#5a7de0] via-[#6c63d9] to-[#6f52c8] text-white sm:pt-28 pt-32 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Multi MRI Brain Tumor Detection
          </h1>

          <p className="text-gray-200 max-w-3xl mx-auto">
            Upload multiple MRI scans together. The AI model will automatically
            separate tumor and non-tumor images for faster medical screening.
          </p>
        </div>


        <div className="mt-8 bg-[#111111] border border-gray-800 rounded-3xl p-5">
          <div className="flex items-start gap-3">
            <X className="text-red-400 mt-1" />

            <div>
              <h3 className="font-bold text-lg mb-2 text-red-400">
                Important Medical Disclaimer
              </h3>

              <p className="text-gray-400 text-sm leading-7">
                This AI system is developed for educational and research support
                purposes only. Results should not be considered as a final
                medical diagnosis. Always consult a certified neurologist,
                radiologist, or neurosurgeon for proper clinical evaluation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-300 mt-6 rounded-3xl p-6 shadow-2xl border border-gray-700">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-purple-400 rounded-3xl h-[300px] flex flex-col justify-center items-center cursor-pointer hover:border-pink-400 transition-all duration-300 bg-[#1d1d1d]"
              >
                <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                  <Upload size={38} />
                </div>

                <h2 className="text-xl font-semibold mb-2 text-center">
                  Upload MRI Images
                </h2>

                <p className="text-sm text-gray-400 text-center px-6">
                  Select multiple MRI scans for batch tumor classification.
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImages}
                />
              </div>

              <div className="mt-5 space-y-3">
                <button
                  onClick={analyzeImages}
                  disabled={images.length === 0 || loading}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    images.length === 0 || loading
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Processing MRI Images..." : "Analyze Images"}
                </button>

                <button
                  onClick={resetAll}
                  disabled={images.length === 0}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    images.length === 0
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="bg-[#101010] rounded-3xl p-5 min-h-[300px] border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Brain className="text-pink-400" />
                    Uploaded MRI Scans
                  </h2>

                  <div className="bg-purple-700 px-4 py-1 rounded-full text-sm">
                    Total Images: {previewImages.length}
                  </div>
                </div>

                {previewImages.length === 0 ? (
                  <div className="h-[220px] flex items-center justify-center text-gray-500 text-center border border-dashed border-gray-700 rounded-2xl">
                    Upload MRI scans to preview them here.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {previewImages.map((img, index) => (
                      <div
                        key={index}
                        className="bg-[#1d1d1d] rounded-2xl overflow-hidden border border-gray-700"
                      >
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-36 object-cover"
                        />

                        <div className="p-3">
                          <p className="text-xs truncate text-gray-300">
                            {img.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <div className="mt-10 grid lg:grid-cols-2 gap-6">
            <div className="bg-[#141414] rounded-3xl p-6 border border-red-700 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-500" size={30} />

                <div>
                  <h2 className="text-2xl font-bold text-red-400">
                    Tumor Detected
                  </h2>
                  <p className="text-sm text-gray-400">
                    MRI scans requiring medical attention
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {tumorResults.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 border border-dashed border-gray-700 rounded-2xl">
                    No Tumor Images Found
                  </div>
                ) : (
                  tumorResults.map((item, index) => {
                    const matchedImage = previewImages.find(
                      (img) => img.name === item.filename
                    );

                    return (
                      <div
                        key={index}
                        className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-red-500"
                      >
                        <img
                          src={matchedImage?.url}
                          alt={item.filename}
                          className="w-1/2 m-auto object-cover"
                        />

                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-red-400 mb-2 truncate">
                            {item.filename}
                          </h3>

                          <div className="mt-2">
                            <p className="text-sm text-gray-400">
                              MRI scan separated successfully
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="bg-[#141414] rounded-3xl p-6 border border-green-700 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="text-green-500" size={30} />

                <div>
                  <h2 className="text-2xl font-bold text-green-400">
                    No Tumor Detected
                  </h2>

                  <p className="text-sm text-gray-400">
                    MRI scans classified as healthy
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {noTumorResults.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 border border-dashed border-gray-700 rounded-2xl">
                    No Healthy MRI Images Found
                  </div>
                ) : (
                  noTumorResults.map((item, index) => {
                    const matchedImage = previewImages.find(
                      (img) => img.name === item.filename
                    );

                    return (
                      <div
                        key={index}
                        className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-green-500"
                      >
                        <img
                          src={matchedImage?.url}
                          alt={item.filename}
                          className="w-1/2 m-auto object-cover"
                        />

                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-green-400 mb-2 truncate">
                            {item.filename}
                          </h3>

                          <div className="mt-2">
                            <p className="text-sm text-gray-400">
                              MRI scan separated successfully
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchDetection;