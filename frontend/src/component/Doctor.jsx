import React, { useState } from "react";
import { Link } from "react-router-dom";;

import Host1 from "../assets/aiims delhi.webp";
import Host2 from "../assets/KGMU.webp";
import Host3 from "../assets/IMS BHU.webp";
import Host4 from "../assets/NIMHANS Bengaluru.webp";
import Host5 from "../assets/PGIMER Chandigarh.webp";
import Host6 from "../assets/SCTIMST Kerala.webp";
import Host7 from "../assets/Institute of Neurosciences Kolkata.webp";

const hospitalData = [
  {
    id: 1,
    hospital: "AIIMS New Delhi",
    image: Host1,
    location: "New Delhi",
    website:"https://www.aiims.edu/index.php/en",
    opd: {
      registration: "8:00 AM – 11:00 AM",
      consultation: "9:00 AM – 1:00 PM",
      workingDays: "Monday – Friday",
    },

    doctors: [
      {
        name: "Dr. P. Sarat Chandra",
        specialty: "Brain Tumor Surgery, Functional Neurosurgery",
        schedule: "Monday & Thursday",
        timing: "9 AM – 1 PM / 2 PM – 6 PM",
      },
      {
        name: "Dr. Ashish Suri",
        specialty: "Skull Base Surgery, Neuro-Oncology, Brain Tumors",
        schedule: "Tuesday & Friday",
        timing: "9 AM – 1 PM",
      },
      {
        name: "Dr. Deepak Agrawal",
        specialty: "Neurotrauma, Brain Surgery",
        schedule: "Monday & Thursday",
        timing: "8:30 AM – 12:30 PM",
      },
      {
        name: "Dr. Sachin Anil Borkar",
        specialty: "Pediatric Neurosurgery, Brain Tumors",
        schedule: "Tuesday & Friday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Sumit Sinha",
        specialty: "Skull Base & Brain Tumor Surgery",
        schedule: "Tuesday & Friday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Rajinder Kumar",
        specialty: "Neuro-Oncology, Brain Surgery",
        schedule: "Tuesday & Friday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Gurudutt Satyarthee",
        specialty: "Brain & Spine Neurosurgery",
        schedule: "Monday & Thursday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Vivek Tandon",
        specialty: "Brain Tumor & Spine Surgery",
        schedule: "Tuesday & Friday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Deepak Kumar Gupta",
        specialty: "Neuro-Oncology, Brain Tumors",
        schedule: "Tuesday & Friday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Pankaj Kumar Singh",
        specialty: "Neurosurgery, Neurovascular Surgery",
        schedule: "Monday & Thursday",
        timing: "Morning OPD",
      },
    ],
  },

  {
    id: 2,
    hospital: "KGMU Lucknow",
    image: Host2,
    location: "Lucknow",
    website:"https://www.kgmu.org",
    opd: {
      registration: "9:00 AM – 2:00 PM",
      consultation: "Morning OPD",
      workingDays: "Monday – Friday",
    },

    doctors: [
      {
        name: "Dr. B. K. Ojha",
        specialty: "Senior Neurosurgeon, Brain Tumor Surgery",
        schedule: "Wednesday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Anil Chandra",
        specialty: "Brain & Spine Neurosurgery",
        schedule: "Friday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Somil Jaiswal",
        specialty: "Brain Tumor & Neuro Surgery",
        schedule: "Friday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Manish Jaiswal",
        specialty: "Neurosurgery",
        schedule: "Tuesday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Aman Singh",
        specialty: "Brain & Spine Surgery",
        schedule: "Monday & Thursday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Awdhesh Kumar Yadav",
        specialty: "Neurosurgery",
        schedule: "Monday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Sarita Kumari",
        specialty: "Neurosurgery",
        schedule: "Tuesday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Mohd Faheem",
        specialty: "Neurosurgery",
        schedule: "Tuesday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Ankur Bajaj",
        specialty: "Neuro Surgery",
        schedule: "Wednesday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Anoop Kumar Singh",
        specialty: "Neuro Surgery",
        schedule: "Wednesday & Friday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Chhitij Srivastava",
        specialty: "Brain & Spine Surgery",
        schedule: "Thursday",
        timing: "9:00 AM – 2:00 PM",
      },
      {
        name: "Dr. Hanuman Prasad Prajapati",
        specialty: "Neurosurgery",
        schedule: "Thursday",
        timing: "9:00 AM – 2:00 PM",
      },
    ],
  },

  {
    id: 3,
    hospital: "IMS BHU Varanasi",
    image: Host3,
    location: "Varanasi",
    website:"https://www.bhu.ac.in/site/UnitHomeTemplate/1_4_1101_Institute-of-Medical-Sciences-Home",
    opd: {
      registration: "8 AM – 12 PM",
      consultation: "8 AM – 2 PM",
      workingDays: "Monday – Friday",
    },

    doctors: [
      {
        name: "Prof. Dr. Anil Kumar Singh",
        specialty: "Brain Tumor Surgery, Neurosurgery",
        schedule: "Morning OPD",
        timing: "Appointment Advised",
      },
      {
        name: "Prof. Dr. S. N. Sankhwar",
        specialty: "Neuro & Surgical Administration",
        schedule: "By Appointment",
        timing: "Flexible",
      },
      {
        name: "Neurosurgery Unit Doctors",
        specialty: "Brain & Spine Surgery",
        schedule: "Daily",
        timing: "8 AM – 2 PM",
      },
      {
        name: "Neurology Specialists",
        specialty: "Stroke, Epilepsy, Brain Disorders",
        schedule: "Weekday OPD",
        timing: "Morning Hours",
      },
    ],
  },

  {
    id: 4,
    hospital: "NIMHANS Bengaluru",
    image: Host4,
    location: "Bengaluru",
    website:"https://www.nimhans.ac.in",
    opd: {
      registration: "8:30 AM onwards",
      consultation: "10 AM – 5 PM",
      workingDays: "Monday – Saturday",
    },

    doctors: [
      {
        name: "Dr. Arivazhagan A.",
        specialty: "Brain Tumor Surgery, Skull Base Surgery",
        schedule: "Wednesday",
        timing: "Unit II",
      },
      {
        name: "Dr. Dhaval Shukla",
        specialty: "Brain & Spine Neurosurgery",
        schedule: "Friday",
        timing: "Unit III",
      },
      {
        name: "Dr. Dwarakanath Srinivas",
        specialty: "Functional Neurosurgery",
        schedule: "Thursday",
        timing: "Unit VI",
      },
      {
        name: "Dr. Nupur Pruthi",
        specialty: "Pediatric Neurosurgery",
        schedule: "Tuesday",
        timing: "Unit IV",
      },
      {
        name: "Dr. Prabhuraj A. R.",
        specialty: "Neurosurgery & Brain Disorders",
        schedule: "Monday",
        timing: "Unit I",
      },
      {
        name: "Dr. Subash Konar",
        specialty: "Brain Tumor & Skull Base Surgery",
        schedule: "Friday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Harsh Deora",
        specialty: "Neurovascular & Brain Surgery",
        schedule: "Thursday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Gyani Jail Singh",
        specialty: "Neuro-Oncology & Neurosurgery",
        schedule: "Wednesday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Abhinith Shashidhar",
        specialty: "Neurosurgery",
        schedule: "Wednesday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Vikas V.",
        specialty: "Brain & Spine Surgery",
        schedule: "Saturday",
        timing: "Unit V",
      },
    ],
  },

  {
    id: 5,
    hospital: "PGIMER Chandigarh",
    image: Host5,
    location: "Chandigarh",
    website:"https://pgimer.edu.in/PGIMER_PORTAL/PGIMERPORTAL/home.jsp",
    opd: {
      registration: "Appointment Based",
      consultation: "Weekly OPD",
      workingDays: "Monday – Friday",
    },

    doctors: [
      {
        name: "Dr. Ashok Kumar Mahapatra",
        specialty: "Pediatric Neurosurgery",
        schedule: "OPD by appointment",
        timing: "Morning",
      },
      {
        name: "Dr. Aditya Gupta",
        specialty: "Brain Tumor & CyberKnife",
        schedule: "Weekly OPD",
        timing: "Day Hours",
      },
      {
        name: "Dr. Vijay K Grover",
        specialty: "Neurocritical Care",
        schedule: "Schedule Varies",
        timing: "Appointment Based",
      },
    ],
  },

  {
    id: 6,
    hospital: "SCTIMST Kerala",
    image: Host6,
    location: "Kerala",
    website:"https://www.sctimst.ac.in",
    opd: {
      registration: "8 AM – 11 AM",
      consultation: "9 AM – 1 PM",
      workingDays: "Monday – Friday",
    },

    doctors: [
      {
        name: "Dr. Easwer H. V.",
        specialty: "Brain Tumor Surgery, Skull Base Surgery",
        schedule: "Monday – Friday",
        timing: "Weekday OPD",
      },
      {
        name: "Dr. Abraham Chandy",
        specialty: "Functional Neurosurgery, Epilepsy Surgery",
        schedule: "By Appointment",
        timing: "Flexible",
      },
      {
        name: "Dr. Santhosh Koshy",
        specialty: "Brain Tumor & Skull Base Surgery",
        schedule: "Weekday OPD",
        timing: "Morning Hours",
      },
      {
        name: "Dr. R. Kesavadas",
        specialty: "Neuro Imaging, Brain MRI Research",
        schedule: "Radiology Schedule",
        timing: "Varies",
      },
      {
        name: "Dr. C. R. Sundararajan",
        specialty: "Neuro Surgery & Brain Disorders",
        schedule: "Weekday OPD",
        timing: "Morning",
      },
      {
        name: "Dr. Anish Kumar",
        specialty: "Neurovascular & Brain Surgery",
        schedule: "Unit Schedule",
        timing: "Morning",
      },
      {
        name: "Dr. Suresh Nair",
        specialty: "Brain & Spine Neurosurgery",
        schedule: "Weekday Consultation",
        timing: "Morning",
      },
    ],
  },

  {
    id: 7,
    hospital: "Institute of Neurosciences Kolkata",
    image: Host7,
    location: "Kolkata",
    website:"https://www.neurokolkata.org",
    opd: {
      registration: "9 AM onwards",
      consultation: "10 AM – 6 PM",
      workingDays: "Monday – Saturday",
    },

    doctors: [
      {
        name: "Dr. Partha Ghosh",
        specialty: "Brain Tumor Surgery, Neurosurgery",
        schedule: "Monday, Wednesday, Friday",
        timing: "9 AM – 1 PM",
      },
      {
        name: "Dr. Prof. B. C. Mohanty",
        specialty: "Brain & Spine Surgery",
        schedule: "Monday, Wednesday, Friday",
        timing: "9 AM – 1 PM",
      },
      {
        name: "Dr. Dipendra Kumar Pradhan",
        specialty: "Neurosurgery",
        schedule: "Monday, Wednesday, Friday",
        timing: "Morning OPD",
      },
      {
        name: "Dr. Hrishikesh Kumar",
        specialty: "Movement Disorders, DBS, Neurology",
        schedule: "Monday – Saturday",
        timing: "10 AM – 6 PM",
      },
      {
        name: "Dr. Ashis Datta",
        specialty: "Epilepsy & Multiple Sclerosis",
        schedule: "Monday – Saturday",
        timing: "10 AM – 6 PM",
      },
      {
        name: "Dr. Soumava Mukherjee",
        specialty: "Neurology",
        schedule: "Monday – Saturday",
        timing: "Day OPD",
      },
      {
        name: "Dr. Ananya Sengupta",
        specialty: "Neurology",
        schedule: "Monday – Saturday",
        timing: "Day OPD",
      },
      {
        name: "Dr. Nilam Singh",
        specialty: "Neurology",
        schedule: "Monday – Saturday",
        timing: "Day OPD",
      },
      {
        name: "Dr. Avik Mukherjee",
        specialty: "Neurology",
        schedule: "Monday – Saturday",
        timing: "2 PM – 6 PM",
      },
    ],
  },
];

const DoctorList = () => {
  const [openCard, setOpenCard] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState("All");

  const filteredHospitals =
    selectedHospital === "All"? hospitalData: hospitalData.filter(
        (hospital) => hospital.hospital === selectedHospital
      );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#5a7de0] via-[#6c63d9] to-[#6f52c8] sm:pt-28 pt-32 px-4 pb-10">
      
      {/* Heading */}
      <div className="text-center text-white mb-10">
        <h1 className="text-4xl font-bold">
          Brain Tumor & Neurosurgery Specialists
        </h1>

        <p className="mt-3 text-gray-200 text-lg">
          Top Neurosurgery Hospitals & Brain Tumor Specialists Across India
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <select
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
          className="w-full px-5 py-4 rounded-xl bg-[#111] border border-gray-600 text-white outline-none focus:border-cyan-400"
        >
          <option value="All">All Hospitals</option>

          {hospitalData.map((hospital) => (
            <option
              key={hospital.id}
              value={hospital.hospital}
            >
              {hospital.hospital}
            </option>
          ))}
        </select>
      </div>

      {/* Hospital Cards */}
      <div className="space-y-8">
        {filteredHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-[#101010] rounded-3xl overflow-hidden border border-gray-700 shadow-2xl"
          >
            {/* Top Banner */}
            <div className="relative">
              <img
                src={hospital.image}
                alt={hospital.hospital}
                className="w-full h-72 object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-4xl font-bold">
                  {hospital.hospital}
                </h2>

                <p className="mt-2 text-gray-200 text-lg">
                  📍 {hospital.location}
                </p>
              </div>
            </div>

            {/* OPD Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-700">
              <div className="bg-[#1b1b1b] p-5 rounded-2xl border border-gray-700">
                <h3 className="text-cyan-400 font-bold mb-2">
                  Registration
                </h3>

                <p className="text-white">
                  {hospital.opd.registration}
                </p>
              </div>

              <div className="bg-[#1b1b1b] p-5 rounded-2xl border border-gray-700">
                <h3 className="text-cyan-400 font-bold mb-2">
                  Consultation
                </h3>

                <p className="text-white">
                  {hospital.opd.consultation}
                </p>
              </div>

              <div className="bg-[#1b1b1b] p-5 rounded-2xl border border-gray-700">
                <h3 className="text-cyan-400 font-bold mb-2">
                  Working Days
                </h3>

                <p className="text-white">
                  {hospital.opd.workingDays}
                </p>
              </div>
            </div>

            {/* Toggle Button */}
            <div className="p-6">
              <button
                onClick={() =>
                  setOpenCard(
                    openCard === hospital.id ? null : hospital.id
                  )
                }
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300"
              >
                {openCard === hospital.id
                  ? "Hide Specialists"
                  : "View Specialists"}
              </button>
            </div>

            {/* Doctors Table */}
            {openCard === hospital.id && (
              <div className="px-6 pb-6 overflow-x-auto">
                <table className="w-full border-collapse overflow-hidden rounded-2xl">
                  <thead>
                    <tr className="bg-cyan-500 text-white">
                      <th className="p-4 text-left">Doctor</th>
                      <th className="p-4 text-left">Specialty</th>
                      <th className="p-4 text-left">Schedule</th>
                      <th className="p-4 text-left">Timing</th>
                    </tr>
                  </thead>

                  <tbody>
                    {hospital.doctors.map((doctor, index) => (
                      <tr
                        key={index}
                        className="bg-[#181818] border-b border-gray-700 hover:bg-[#222] transition-all"
                      >
                        <td className="p-4 text-white font-semibold">
                          {doctor.name}
                        </td>

                        <td className="p-4 text-gray-300">
                          {doctor.specialty}
                        </td>

                        <td className="p-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                            {doctor.schedule}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                            {doctor.timing}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Bottom Buttons */}
                <Link 
                  to={hospital.website}
                  target="_blank"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-bold w-78"
                >
                  View Website
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;