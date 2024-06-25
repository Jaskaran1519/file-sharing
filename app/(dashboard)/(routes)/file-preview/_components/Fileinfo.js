"use client";
import { File } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Fileinfo = ({ file }) => {
  const [fileType, setFileType] = useState();
  useEffect(() => {
    if (file) {
      const type = file?.fileType.split("/")[0];
      setFileType(type);
      console.log(type); // Log the type directly here
    }
  }, [file]);
  return (
    file && (
      <div className="text-center  border flex justify-center m-4 flex-col items-center p-2 rounded-xl border-gray-400 overflow-hidden">
        {file?.fileType == "image" ? (
          <Image
            src={fileType == "image" ? file?.fileUrl : "/file.png"}
            alt="Your image"
            width={200}
            height={200}
            className="h-[200px] rounded-md object-contain"
          />
        ) : (
          <File size={200} className="text-primary" />
        )}
        <div className="overflow-hidden">
          <h2>{file.fileName}</h2>
          <h2 className="text-gray-400 text-[13px]">{file.fileType}</h2>
        </div>
      </div>
    )
  );
};

export default Fileinfo;
