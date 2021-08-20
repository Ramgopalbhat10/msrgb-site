import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehype_attr from "rehype-attr";
import moment from "moment";

import { useApollo } from "../../src/apollo";
import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_posts,
} from "../../src/generated/GET_ALL_POSTS";
import { getPostBySlug, getAllPosts_slug } from "../../src/queries/getPosts";

const Post: React.FC<{ post: GET_ALL_POSTS_posts }> = ({ post }) => {
  const { slug, title, description, content, thumbnail, updated_at } = post;
  const updatedAt = moment(updated_at).format("MMM Do YY");

  return (
    <div className="md:container md:mx-auto my-5 mx-auto xl:w-8/12">
      <Head>
        <title>{title}</title>
      </Head>
      <h2 className="text-primary sm:text-5xl text-3xl underline py-5 mx-5 sm:mx-10 font-medium text-center flex-grow tracking-wider">
        {title}
      </h2>
      <div className="flex mx-5 sm:mx-10 py-3 border-b-2 border-gray-600 justify-between">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-primary mr-1 sm:mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <p className="text-primary text-xs sm:text-sm">{updatedAt}</p>
        </div>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-primary mr-1 sm:mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-primary text-xs sm:text-sm">5 min read</p>
        </div>
      </div>
      <div className="mx-5 mt-5 sm:mx-10 flex justify-center">
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
          rehypePlugins={[rehype_attr]}
          components={{
            p: ({ children }) => {
              return (
                <p className="text-primary text-base sm:text-xl mt-2">
                  {children}
                </p>
              );
            },
            ul: ({ children }) => {
              return (
                <ul className="text-primary text-base sm:text-xl ml-8 list-disc">
                  {children}
                </ul>
              );
            },
            ol: ({ children }) => {
              return (
                <ol className="text-primary text-base sm:text-xl ml-8 list-decimal">
                  {children}
                </ol>
              );
            },
            li: ({ children }) => {
              return (
                <li className="text-primary text-base sm:text-xl">
                  {children}
                </li>
              );
            },
            h1: ({ children }) => {
              return (
                <h1 className="text-primary text-xl sm:text-3xl my-5 underline">
                  {children}
                </h1>
              );
            },
            h2: ({ children }) => {
              return (
                <h2 className="text-primary text-2xl sm:text-3xl my-5 underline">
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
