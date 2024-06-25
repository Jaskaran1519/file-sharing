"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "../../../../firebaseConfig";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Eye, Share, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CSpinner } from "@coreui/react";

const Files = () => {
  const { user, isSignedIn } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const pressTimer = useRef(null); // Use ref to store the press timer
  const db = getFirestore(app);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "uploadedFile"),
          where("userEmail", "==", user.primaryEmailAddress.emailAddress)
        );
        const querySnapshot = await getDocs(q);

        const userFiles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFiles(userFiles);
      } catch (error) {
        console.error("Error fetching files: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [user, db]);

  const deleteFile = async (fileId) => {
    try {
      await deleteDoc(doc(db, "uploadedFile", fileId));
      setFiles(files.filter((file) => file.id !== fileId));
      setSelectedFile(null);
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
  };

  const deleteSelectedFiles = async () => {
    try {
      const deletePromises = selectedFiles.map((fileId) =>
        deleteDoc(doc(db, "uploadedFile", fileId))
      );
      await Promise.all(deletePromises);
      setFiles(files.filter((file) => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
      setShowCheckboxes(false); // Hide checkboxes after deletion
    } catch (error) {
      console.error("Error deleting files: ", error);
    }
  };

  const openDrawer = (file) => {
    if (!showCheckboxes) {
      setSelectedFile(file);
      setIsDrawerOpen(true);
    }
  };

  const closeDrawer = () => {
    setSelectedFile(null);
    setIsDrawerOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeDrawer();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFileSelect = (fileId) => {
    const newSelectedFiles = selectedFiles.includes(fileId)
      ? selectedFiles.filter((id) => id !== fileId)
      : [...selectedFiles, fileId];
    setSelectedFiles(newSelectedFiles);
    setShowCheckboxes(newSelectedFiles.length > 0); // Show checkboxes if there are selected files
  };

  const handleLongPress = (fileId) => {
    setShowCheckboxes(true);
    handleFileSelect(fileId);
  };

  const handleMouseDown = (fileId) => {
    pressTimer.current = setTimeout(() => handleLongPress(fileId), 1000);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer.current);
  };

  const handleTouchStart = (fileId) => {
    pressTimer.current = setTimeout(() => handleLongPress(fileId), 1000);
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer.current);
  };

  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-auto">
      <div className="w-[90%] mx-auto text-[20px] text-center my-5 text-gray-600 flex flex-wrap justify-between items-center pr-5">
        <strong className="text-[24px] py-3 text-gray-800">
          Your Uploaded Files
        </strong>
        {selectedFiles.length > 0 && (
          <button
            className="flex items-center px-4 py-2 my-2 text-sm text-red-600 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none"
            onClick={deleteSelectedFiles}
          >
            <Trash className="w-5 h-5 " />
          </button>
        )}
        <input
          type="text"
          className="px-3 py-2 h-10 border-[1px] text-[16px] border-gray-300 rounded-lg "
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div className="spinner mx-auto mt-[30vh] md:mt-[40vh]"></div>
      ) : (
        <div className="w-[90%] mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`bg-white rounded-lg shadow-md p-4 cursor-pointer ${
                selectedFiles.includes(file.id)
                  ? "border-2 border-blue-500"
                  : ""
              }`}
              onClick={() =>
                showCheckboxes ? handleFileSelect(file.id) : openDrawer(file)
              }
              onMouseDown={() => handleMouseDown(file.id)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={() => handleTouchStart(file.id)}
              onTouchEnd={handleTouchEnd}
              style={{
                filter: isDrawerOpen ? "blur(4px)" : "none",
                pointerEvents: isDrawerOpen ? "none" : "auto",
              }}
            >
              <p className="text-lg font-medium select-none text-gray-900 truncate">
                {file.fileName}
              </p>
              <div className="flex justify-between items-center">
                <div className="w-[50%]">
                  <p className="text-sm select-none text-gray-500 truncate">
                    {file.fileType}
                  </p>
                  <p className="text-sm select-none text-gray-500">
                    {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                {showCheckboxes && (
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleFileSelect(file.id)}
                    className="mb-2"
                  />
                )}
              </div>
            </div>
          ))}
          {filteredFiles.length === 0 && (
            <div className="w-[70vw] h-[70vh] text-center text-gray-900 text-[2rem] font-semibold mx-auto mt-[30vh] ">
              No files found.
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {isDrawerOpen && !showCheckboxes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-40"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-[100vh] md:w-full h-[50vh] bg-white shadow-lg overflow-y-auto"
            >
              <div className="w-full flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {selectedFile && selectedFile.fileName}
                </h3>
                <button
                  onClick={closeDrawer}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.707 9.293a1 1 0 0 1 1.414 1.414L11.414 12l1.707 1.293a1 1 0 1 1-1.414 1.414L10 13.414l-1.293 1.707a1 1 0 0 1-1.414-1.414L8.586 12 6.879 10.293a1 1 0 0 1 1.414-1.414L10 10.586l1.293-1.707a1 1 0 0 1 1.414 1.414L11.414 12z"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-10 py-5">
                {selectedFile && (
                  <>
                    <p className="text-[1.5rem] font-semibold text-gray-600 mb-2">
                      File Type:{" "}
                      <span className="text-gray-400 text-normal">
                        {selectedFile.fileType}
                      </span>
                    </p>
                    <p className="text-[1.5rem] font-semibold text-gray-600 mb-2">
                      File Size:{" "}
                      <span className="text-gray-400 text-normal">
                        {(selectedFile.fileSize / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </p>
                    <div className="flex space-x-2 mt-10">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/file-preview/${selectedFile.id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        onClick={() => {
                          console.log("Preview file:", selectedFile.fileName);
                        }}
                      >
                        <Share className="w-5 h-5 mr-2" />
                        Share
                      </Link>
                      <button
                        className="flex items-center px-4 py-2 text-sm text-red-600 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none"
                        onClick={() => deleteFile(selectedFile.id)}
                      >
                        <Trash className="w-5 h-5 mr-2" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Files;
