import React, { Fragment, useState } from "react";
import { GetBugTrack } from "../../hooks/get-bug-track";
import { useParams } from "react-router-dom";
import { FaExternalLinkAlt, FaBug } from "react-icons/fa";
import {
  RiUserReceived2Fill,
  RiFlag2Fill,
  RiBarChartHorizontalFill,
  RiTimerFill,
} from "react-icons/ri";
import { MdOutlineLabelImportant } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import UserInfo from "../../components/UserInfo/UserInfo";
import clsx from "clsx";
import { BGS } from "../../utils";

export default function SingleBugTrack() {
  const { id } = useParams();
  const { data, loading } = GetBugTrack(id);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(`http://localhost:3001/${imageUrl}`);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  //   {
  //     _id: '666b048a5f4ad18e3e25b2bf',
  //     title: 'Sample Bug Title 2',
  //     description: 'This is a description of a sample bug 2.',
  //     severity: 'critical',
  //     priority: 'medium',
  //     status: 'open',
  //     media: [],
  //     reportedBy: 'Arham Khan',
  //     assignedTo: [
  //       {
  //         _id: '661cc454ff04e203e79a6bf3',
  //         fName: 'Arham',
  //         lName: 'Khan',
  //         email: 'arham@agilecraft.com'
  //       },
  //       {
  //         _id: '66239300c43b223ccb7c0db0',
  //         fName: 'Musharraf',
  //         lName: 'Hussain',
  //         email: 'musharraf@agilecraft.com'
  //       }
  //     ],
  //     createdAt: '2024-06-13T14:39:06.874Z',
  //     updatedAt: '2024-06-13T14:39:  06.874Z',
  //     __v: 0
  //   }

  console.log(data);

  if (loading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="container mx-auto p-4 md:p-8">
        {/* Bug Report Details Heading */}
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          <FaBug className="inline-block mr-2 text-red-500" />
          Bug Report Details
        </h1>

        {/* Grid Layout for Content (Enhanced) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Main Details and Images/Videos */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Title */}
            <div className="flex items-center">
              <FaExternalLinkAlt className="mr-2 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">Title</h2>
            </div>
            <p className="text-gray-700">{data?.title}</p>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                <RiBarChartHorizontalFill className="inline-block mr-2 text-gray-600" />
                Description
              </h2>
              <p className="text-gray-700">{data?.description}</p>
            </div>

            {/* Screenshots/Videos */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Screenshots/Videos
              </h2>
              <div className="flex flex-wrap gap-4">
                {data?.media?.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3001/${imageUrl}`}
                    alt={`Bug Media ${index}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                    onClick={() => openModal(imageUrl)}
                  />
                ))}

                {data?.media?.length <= 0 && <h1>No Images/Videos found!</h1>}
              </div>

              {/* Image Modal */}

              <AnimatePresence>
                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                  >
                    <motion.img
                      src={selectedImage}
                      alt="Enlarged View"
                      layoutId={selectedImage}
                      className="max-w-full max-h-full object-contain rounded-lg"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Status, Priority, Assigned To, Reporter */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Severity */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                <RiFlag2Fill className="inline-block mr-2 text-red-500" />
                Severity
              </h2>
              <p
                className={`text-gray-700 capitalize 
                        ${data?.severity === "critical" ? "text-red-500" : ""}
                        ${data?.severity === "high" ? "text-orange-500" : ""}
                        ${data?.severity === "medium" ? "text-yellow-500" : ""}
                        ${data?.severity === "low" ? "text-green-500" : ""}`}
              >
                {data?.severity}
              </p>
            </div>

            {/* Priority */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                <MdOutlineLabelImportant className="inline-block mr-2 text-yellow-500" />
                Priority
              </h2>
              <p className="text-gray-700 capitalize">{data?.priority}</p>
            </div>

            {/* Current Status */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                <RiTimerFill className="inline-block mr-2 text-green-500" />
                Current Status
              </h2>
              <p className="text-gray-700 capitalize">{data?.status}</p>
            </div>

            {/* Reported By */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                <RiUserReceived2Fill className="inline-block mr-2 text-blue-500" />
                Reported By
              </h2>
              <p className="text-gray-700">{data?.reportedBy}</p>
            </div>

            {/* Assigned To (if applicable) */}
            {data.assignedTo && data.assignedTo.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Assigned To
                </h2>
                <div className="flex flex-col">
                  {data.assignedTo.map((user, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <div
                        className={clsx(
                          "w-8 h-8 md:w-12 md:h-12 rounded-full text-white flex items-center justify-center text-sm mr-6",
                          BGS[index % BGS.length]
                        )}
                      >
                        <UserInfo user={user} />
                      </div>
                      <div>
                        <h3 className="text-base text-gray-700">
                          {user.fName} {user.lName}
                        </h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
