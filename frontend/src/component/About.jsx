import React from "react";
import {FaBrain} from "react-icons/fa"
import glioma from "../assets/glioma.webp";
import pituitary from "../assets/pituitary.webp";
import meningioma from "../assets/meningioma.webp"; 

const tumorInfo = [
  {
    name: "Glioma",
    description:
      "Glioma is a type of brain tumor that grows in glial cells. It can grow fast and may cause headaches, seizures, and changes in personality.",
    color: "from-purple-500 to-purple-700",
    precaution: "Regular MRI, visit neurologist, manage stress",
    dangerLevel: "High 🔴",
    icon: glioma,
    imageSize:100
  },
  {
    name: "Meningioma",
    description:
      "Meningioma is a slow-growing tumor that starts in the protective layers of the brain and spinal cord (meninges). Most cases are not cancer.",
    color: "from-blue-500 to-blue-700",
    precaution: "Regular scans, doctor checkups",
    dangerLevel: "Medium 🟡",
    icon: meningioma,
    imageSize:120
  },
  {
    name: "No Tumor (Normal)",
    description:
      "This category means the MRI image shows no brain tumor. The brain structure, tissue, and symmetry look normal.",
    color: "from-green-500 to-green-700",
    precaution: "Healthy lifestyle, preventive care",
    dangerLevel: "Safe 🟢",
    icon: <FaBrain />,
  },
  {
    name: "Pituitary Tumor",
    description:
      "Pituitary tumor grows in the pituitary gland, which controls hormones. It can cause vision problems, headaches, and hormone imbalance.",
    color: "from-red-500 to-red-700",
    precaution: "Check hormones, eye tests, visit endocrinologist",
    dangerLevel: "Variable 🟠",
    icon: pituitary,
    imageSize:250
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white sm:pt-28 pt-32 z-10 px-10 pb-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-wide">
        🧠 About Brain Tumor Classes
      </h1>

      <p className="text-center max-w-3xl mx-auto text-gray-300 mb-12">
        Our system can detect four main types of brain tumor classes from MRI
        images. Below you can see each category with simple explanation.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto min-h-screen">
        {tumorInfo.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl bg-gradient-to-br ${item.color} shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300`}
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {item.name!='No Tumor (Normal)'?<img src={item.icon} style={{ width: `${item.imageSize}px` }} className="spin-x"/>:<p>{item.icon}</p>}
              <h2 className="text-2xl font-bold">{item.name}</h2>
            </div>
            <p className="text-gray-100">{item.description}</p>
            <p className="mt-3 text-sm text-gray-200">
              <strong>Precaution:</strong> {item.precaution}
            </p>
            <p className="text-sm text-gray-200">
              <strong>Danger Level:</strong> {item.dangerLevel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;