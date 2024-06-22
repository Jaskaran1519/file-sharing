"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Download, Eye, EyeOff } from "lucide-react";

const FileItem = ({ file }) => {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    file && (
      <div className="p-5 rounded-md bg-white flex flex-col items-center">
        <div className="text-center flex-col gap-3 items-center flex">
          <h2 className="text-[20px] text-gray-600">
            <strong className="text-primary">{file.username}</strong> shared a
            file with you
          </h2>
          <Image
            src="/logo.svg"
            width={150}
            height={150}
            className="w-[150px] h-[150px] p-5"
            alt="photo"
            priority
          />
          <h2 className="text-gray-500 text-[15px]">
            {file.fileName}/{file.fileSize / 1000} kb /{file.fileType}
          </h2>
        </div>
        {file.password.length > 3 ? (
          <div className="relative mt-5 w-full">
            <input
              type={passwordVisible ? "text" : "password"}
              className="p-2 pr-10 border rounded-md text-[14px] text-center outline-gray-400 w-full"
              placeholder="Enter password to get access"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
            >
              {passwordVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        ) : null}

        <button
          className="flex gap-2 p-2 bg-primary text-white rounded-full px-5 items-center hover:bg-blue-600 text-[14px] mt-5 text-center justify-center disabled:bg-gray-300"
          disabled={file.password !== password}
          onClick={() => window.open(file.fileUrl)}
        >
          <Download className="h-4 w-4" /> Download
        </button>
        <h2 className="text-gray-700 text-[12px]">*Terms and conditions</h2>
      </div>
    )
  );
};

export default FileItem;
