import GlobalApi from "./../../../../_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { Copy, Eye, EyeOff } from "lucide-react";

import React, { useState } from "react";

const FileShareForm = ({ file, onPasswordSave }) => {
  const [ispasswordEnable, setIsPasswordEnable] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [copyNotification, setCopyNotification] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { user } = useUser();

  const sendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file?.fileSize,
      fileType: file?.fileType,
      shortUrl: file.ShortUrl,
    };
    GlobalApi.SendEmail(data).then((resp) => {
      console.log(resp);
    });
  };
  const onCopyClick = () => {
    navigator.clipboard.writeText(file.shorturl).then(() => {
      setCopyNotification(true);
      setTimeout(() => {
        setCopyNotification(false);
      }, 1500);
    });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    file && (
      <div className="flex flex-col gap-2">
        <div>
          <label className="text-[14px] text-gray-500">show</label>
          <div className="flex gap-5 p-2 border rounded-md relative ">
            <input
              type="text"
              value={file.shorturl}
              disabled
              className="disabled:text-gray-500 w-full bg-green outline-none"
            />
            <Copy
              className="text-gray-400 hover:text-gray-700"
              onClick={() => onCopyClick()}
            />
            {copyNotification && (
              <div className="text-gray-500 bg-white rounded-full absolute -top- text-[1rem] p-2 border-[1px] border-gray-500 mt-2">
                Copied
              </div>
            )}
          </div>
          <div className="gap-3 flex mt-5">
            <input
              type="checkbox"
              onChange={(e) => setIsPasswordEnable(true)}
            />
            <label>Enable Password?</label>
          </div>
          {ispasswordEnable ? (
            <div className="flex gap-3 items-center">
              <div className="border rounded-md w-full p-2 relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="disabled:text-gray-500 bg-transparent outline-none w-full"
                  onChange={(e) => setpassword(e.target.value)}
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
              <button
                className="p-2 bg-primary text-white rounded-md disabled:bg-gray-300 active:bg-gray-500 hover:bg-gray-800"
                disabled={password?.length < 3}
                onClick={() => onPasswordSave(password)}
              >
                Save
              </button>
            </div>
          ) : null}
          <div className="border rounded=md p-3 mt-5">
            <label className="text-[14px] text-gray-800">
              Send File to Email
            </label>
            <div className="border rounded-md p-2">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="bg-transparent"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="p-2 disabled:bg-gray-300 bg-primary text-white hover:bg-gray-600 w-full mt-2 rounded-md "
              onClick={() => {
                sendEmail();
              }}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default FileShareForm;
