"use client";
import React, { useEffect, useState } from "react";
import UploadForm from "./_components/UploadForm";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../../../firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useUser } from "@clerk/nextjs";
import { generateRandomString } from "./../../../_utils/GenerateRandomString";
import { useRouter } from "next/navigation";
import AlertMsg from "./_components/AlertMsg"; // Make sure you import the AlertMsg component

const Upload = () => {
  const { user } = useUser();
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null); // State for error message
  const [uploading, setUploading] = useState(false); // State to manage uploading state
  const storage = getStorage(app);
  const db = getFirestore(app);
  const router = useRouter();

  const uploadFile = (file) => {
    setUploading(true); // Set uploading state to true
    const metadata = {
      contentType: file.type,
    };
    const storageRef = ref(storage, "file-upload/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        setErrorMsg("Upload failed. Please try again."); // Set error message
        setUploading(false); // Set uploading state to false
        setProgress(0); // Reset progress
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          saveInfo(file, downloadURL);
        });
      }
    );
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString();

    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: fileUrl,
      userEmail: user.primaryEmailAddress.emailAddress,
      username: user.fullName,
      password: "",
      id: docId,
      shorturl: `${process.env.NEXT_PUBLIC_BASE_URL}f/${docId}`,
    });
    router.push("/file-preview/" + docId);
  };

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setUploadCompleted(true);
      }, 1000);
    }
  }, [progress]);

  useEffect(() => {
    if (uploadCompleted) {
      setTimeout(() => {
        setUploadCompleted(false);
        setUploading(false); // Reset uploading state after completion
      }, 1000);
    }
  }, [uploadCompleted]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg(null); // Clear error message after 4 seconds
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  return (
    <div className="p-5 px-8 md:">
      <h2 className="text-[20px] text-center m-5 text-gray-600">
        Start
        <strong className="text-[20px] text-gray-800"> Uploading </strong>
        File and <strong className="text-[20px] text-gray-800">Share </strong>
        it
      </h2>
      {errorMsg && <AlertMsg msg={errorMsg} />} {/* Display error message */}
      <UploadForm
        uploadBtnClick={uploadFile}
        progress={progress}
        uploading={uploading} // Pass uploading state
      />
    </div>
  );
};

export default Upload;
