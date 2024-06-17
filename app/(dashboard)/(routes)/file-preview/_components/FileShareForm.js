import GlobalApi from "./../../../../_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { Copy } from "lucide-react";

import React, { useState } from "react";

const FileShareForm = ({ file, onPasswordSave }) => {
  const [isPasswordEnable, setIsPasswordEnable] = useState(false);
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState();
  const [copied, setCopied] = useState(false);

  const { user } = useUser();

  const whatsappText = "123456 ";

  const sendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file?.fileSize,
      fileType: file?.fileType,
      shortUrl: file.shortUrl,
    };
    GlobalApi.SendEmail(data).then((resp) => {
      console.log(resp);
    });
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(file.shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    file && (
      <div className="flex flex-col gap-2">
        <div>
          <label className="text-[14px] text-gray-500">show</label>
          <div className="flex gap-5 p-2 border rounded-md relative">
            <input
              type="text"
              value={file.shortUrl}
              disabled
              className="disabled:text-gray-500 w-full bg-green outline-none"
            />
            <Copy
              className="text-gray-400 hover:text-gray-700 cursor-pointer"
              onClick={onCopyClick}
            />
            {copied && (
              <div className="notification absolute -top-10 bg-gray-200 px-3 py-1 rounded-lg left-[90%]">
                Copied!
              </div>
            )}
          </div>
          <div className="gap-3 flex mt-5">
            <input
              type="checkbox"
              onChange={(e) => setIsPasswordEnable(e.target.checked)}
            />
            <label>Enable Password?</label>
          </div>
          {isPasswordEnable && (
            <div className="flex gap-3 items-center">
              <div className="border rounded-md w-full p-2">
                <input
                  type="password"
                  className="disabled:text-gray-500 bg-transparent outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="p-2 bg-primary text-white rounded-md disabled:bg-gray-300 active:bg-gray-500 hover:bg-gray-800"
                disabled={password?.length < 3}
                onClick={() => onPasswordSave(password)}
              >
                Save
              </button>
            </div>
          )}
          {/* <div className="border rounded-md p-3 mt-5">
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
              className="p-2 disabled:bg-gray-300 bg-primary text-white hover:bg-gray-600 w-full mt-2 rounded-md"
              onClick={sendEmail}
            >
              Send Email
            </button>
          </div> */}
          <a
            href={`whatsapp://send?text=${whatsappText}`}
            data-action="share/whatsapp/share"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share to WhatsApp
          </a>
        </div>
      </div>
    )
  );
};

export default FileShareForm;
