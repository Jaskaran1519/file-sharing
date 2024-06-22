import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl text-primary font-extrabold sm:text-5xl">
              Safe and fast file sharing
              <strong className="font-extrabold text-primary sm:block">
                {" "}
                in one go.{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Drag and drop here or select a file from your system to share, you
              can also make the sharing more secure with a password
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-hoverPrimary focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/upload"
              >
                Get Started
              </Link>

              <Link
                className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-hoverPrimary focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                href="/about"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
