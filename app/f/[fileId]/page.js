"use client";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../../firebaseConfig";
import FileItem from "./_components/FileItem";
const FileView = ({ params }) => {
  const db = getFirestore(app);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (params.fileId) {
        try {
          const docRef = doc(db, "uploadedFile", params.fileId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFile(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching file data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [params.fileId]);

  return (
    <div className="bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : file ? (
        <FileItem file={file} />
      ) : (
        <p>No file found.</p>
      )}
    </div>
  );
};

export default FileView;
