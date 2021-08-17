import Head from "next/head";
import React from "react";

const Custom404: React.FC = () => {
  return (
    <div className="md:container md:mx-auto flex my-5 flex-row items-center">
      <Head>
        <title>Not Found</title>
      </Head>
      <h2 className="text-secondary sm:text-5xl text-3xl py-10 font-medium text-center flex-grow tracking-wider">
        Oops! Not the Llama you are looking for 🤷‍♀️
      </h2>
    </div>
  );
};

export default Custom404;
