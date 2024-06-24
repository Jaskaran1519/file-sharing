"use client";
import React, { useEffect, useState } from "react";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track drawer open/close
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
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
      setSelectedFile(null); // Close the drawer after deleting
      setIsDrawerOpen(false); // Close drawer explicitly
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
  };

  const openDrawer = (file) => {
    setSelectedFile(file);
    setIsDrawerOpen(true); // Open drawer when a file is clicked
  };

  const closeDrawer = () => {
    setSelectedFile(null);
    setIsDrawerOpen(false); // Close drawer
  };

  const handleBackdropClick = (e) => {
    // Close the drawer if clicked outside of it
    if (e.target === e.currentTarget) {
      closeDrawer();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter files based on search term
  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-auto">
      <div className="w-[90%] mx-auto text-[20px] text-center my-5 text-gray-600 flex flex-wrap justify-between pr-5">
        <strong className="text-[24px] py-3 text-gray-800">
          Your Uploaded Files
        </strong>
        <input
          type="text"
          className="px-3 py-2 h-10 border-[1px] text-[16px] border-gray-300 rounded-lg"
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
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => openDrawer(file)}
              style={{
                filter: isDrawerOpen ? "blur(4px)" : "none",
                pointerEvents: isDrawerOpen ? "none" : "auto",
              }}
            >
              <p className="text-lg font-medium text-gray-900 truncate">
                {file.fileName}
              </p>
              <div className="">
                <p className="text-sm text-gray-500 truncate">
                  {file.fileType}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          ))}
          {filteredFiles.length === 0 && (
            <div className="text-center text-gray-900 text-[2rem] font-semibold flex justify-center mt-[35vh]">
              No files found.
            </div>
          )}
        </div>
      )}

      {/* Drawer Component */}
      <AnimatePresence>
        {isDrawerOpen && (
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
              className="w-[100vh] md:w-full  h-[50vh] bg-white  shadow-lg overflow-y-auto"
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
                        {" "}
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
                        href={`/file-preview/${selectedFile.id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        onClick={() => {
                          // Implement file preview logic
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
                      {/* <Link
                        href={selectedFile.fileUrl}
                        className="flex items-center px-4 py-2 text-sm text-red-600 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none"
                      >
                        <Eye />
                        View
                      </Link> */}
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
