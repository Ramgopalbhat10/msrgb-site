import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { useApollo } from "../../src/apollo";
import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_posts,
} from "../../src/generated/GET_ALL_POSTS";
import { getPostBySlug, getAllPosts_slug } from "../../src/queries/getPosts";

const Post: React.FC<{ post: GET_ALL_POSTS_posts }> = ({ post }) => {
  const { slug, title, description, content, thumbnail } = post;

  return (
    <div className="md:container md:mx-auto my-5 mx-auto xl:w-8/12">
      <Head>
        <title>{slug}</title>
      </Head>
      <h2 className="text-primary sm:text-5xl text-3xl underline py-5 mx-5 sm:mx-10 font-medium text-center flex-grow tracking-wider">
        {title}
      </h2>
      <div className="mx-5 sm:mt-5 sm:mx-10 flex justify-center">
        <img
          className="md:h-auto w-full object-cover object-center rounded-md"
          src={thumbnail[0].url}
          alt="blog"
        />
      </div>
      <p className="text-gray-400 text-base sm:text-xl italic text-center font-times tracking-wider flex-grow p-7 mx-5 mt-5 sm:mt-10 sm:mx-10 rounded-md bg-primary">
        {description}
      </p>
      <div className="p-5 sm:p-10 mx-auto">
        <ReactMarkdown
          className=""
          children={content}
          components={{
            p: ({ children }) => {
              return (
                <p className="text-primary text-base sm:text-xl">{children}</p>
              );
            },
            h2: ({ children }) => {
              return (
                <h2 className="text-primary text-base sm:text-xl my-5">
                  {children}
                </h2>
              );
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <div className="text-xs sm:text-base">
                  <SyntaxHighlighter
                    className="rounded-md bg-primary"
                    children={String(children).replace(/\n$/, "")}
                    style={theme}
                    language={match[1]}
                  />
                </div>
              ) : (
                <code
                  className={`${className} text-pink-400 py-1 px-2 bg-primary rounded-md font-bold`}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: { data: GET_ALL_POSTS } = await useApollo().query({
    query: getAllPosts_slug,
  });

  const paths = data.posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data }: { data: GET_ALL_POSTS } = await useApollo().query({
    query: getPostBySlug,
    variables: { slug: context.params.slug as string },
  });

  return {
    props: {
      post: data.posts[0],
    },
  };
};

export default Post;
