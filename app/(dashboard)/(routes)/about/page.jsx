import React from "react";

const About = () => {
  return (
    <div className=" text-gray-800 min-h-screen py-8 w-[90%] mx-auto">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          About ShareLit
        </h1>
        <p className="text-md mb-6 text-center">
          Welcome to ShareLit – your secure and easy-to-use file sharing
          platform!
        </p>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          What is ShareLit?
        </h2>
        <p className="text-md mb-6">
          ShareLit is a web application designed to make file sharing simple,
          secure, and efficient. Whether you need to send a document to a
          colleague, share photos with friends, or transfer large files,
          ShareLit is here to help.
        </p>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-md mb-6 ">
          <li>
            <strong>Easy File Upload:</strong> With ShareLit, you can quickly
            upload your files with just a few clicks. Our intuitive interface
            ensures that you can get your files uploaded and ready to share
            without any hassle.
          </li>
          <li>
            <strong>Secure Sharing:</strong> Security is our top priority. Each
            file you upload can be protected with a unique password. This
            ensures that only the intended recipient can access your files,
            providing you with peace of mind.
          </li>
          <li>
            <strong>Personalized Sharing:</strong> Once your file is uploaded,
            ShareLit generates a short URL that you can easily share. You can
            send this link to your recipient, who will then use the provided
            password to access the file.
          </li>
          <li>
            <strong>Email Integration:</strong> You can directly send the file
            link to your recipient's email from within the ShareLit app. This
            streamlines the sharing process and ensures that your files are
            delivered to the right person.
          </li>
          <li>
            <strong>Recent Files:</strong> Our "Files" page keeps track of your
            recent uploads, making it easy for you to manage and re-share your
            files whenever necessary.
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          How It Works
        </h2>
        <ol className="list-decimal list-inside text-md mb-6">
          <li>
            <strong>Upload Your File:</strong> Simply drag and drop your file or
            select it from your device.
          </li>
          <li>
            <strong>Set a Password:</strong> Protect your file by setting a
            unique password. Only those with the password will be able to access
            the file.
          </li>
          <li>
            <strong>Share the Link:</strong> Share the generated short URL with
            your recipient via email or any other communication channel.
          </li>
          <li>
            <strong>Secure Access:</strong> The recipient uses the link and the
            password to securely download the file.
          </li>
        </ol>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Why Choose ShareLit?
        </h2>
        <p className="text-md mb-6">
          At ShareLit, we understand the importance of both convenience and
          security in file sharing. Our platform is designed to offer a seamless
          experience while ensuring that your data remains protected. Whether
          you're sharing personal documents, work-related files, or large media,
          ShareLit has got you covered.
        </p>
        <p className="text-lg mb-6">
          Thank you for choosing ShareLit. If you have any questions or need
          assistance, feel free to reach out to our support team.
        </p>
        <p className="text-lg font-semibold text-center">Happy Sharing!</p>
        <p className="text-lg text-center">The ShareLit Team</p>
      </div>
    </div>
  );
};

export default About;
