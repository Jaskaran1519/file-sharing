"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
const FileItem = ({ file }) => {
  const [password, setPassword] = useState("");

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
          <input
            type="password"
            className="p-2 border rounded-md text-[14px] mt-5 text-center outline-gray-400"
            placeholder="Enter password to get access"
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : null}

        <button
          href=""
          className="flex gap-2 p-2 bg-primary text-white rounded-full px-5 items-center hover:bg-blue-600 text-[14px] mt-5 text-center justify-center disabled:bg-gray-300"
          disabled={file.password !== password}
          onClick={() => window.open(file.fileUrl)}
        >
          <Download className="h-4 w-4" /> Download
        </button>
        <h2 className="text-gray-700 text-[12px]">*Term and conditions</h2>
      </div>
    )
  );
};

export default FileItem;
