import Head from "next/head";
import { useApollo } from "../../src/apollo";
import { getAllPosts } from "../../src/queries/getPosts";
import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_posts,
} from "../../src/generated/GET_ALL_POSTS";
import Link from "next/link";
import { GetStaticProps } from "next";

const blog = ({ posts }: { posts: GET_ALL_POSTS_posts[] }) => {
  const allPosts = posts.map((post) => {
    const { slug, category, title, description } = post;

    return (
      <div className="p-4 md:w-1/2 lg:w-1/3" key={slug}>
        <div className="h-full shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={post.thumbnail[0].url}
            alt="blog"
          />
          <div className="p-6 h-full bg-primary">
            <p className="tracking-widest text-xs font-medium text-secondary px-2 py-1 mb-3 bg-blue-500 inline-block rounded">
              {category}
            </p>
            <h1 className="text-2xl text-indigo-400 tracking-wide font-medium mb-3">
              {title}
            </h1>
            <p className="leading-relaxed mb-3">{description}</p>
            <div className="flex items-center flex-wrap ">
              <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                <a className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="md:container md:mx-auto my-5">
      <Head>
        <title>All Posts</title>
      </Head>
      <h2 className="text-secondary sm:text-5xl text-3xl py-5 mx-5 sm:mx-10 font-medium underline text-center flex-grow tracking-wider">
        Blog Posts
      </h2>
      <p className="text-secondary text-xl text-center font-times tracking-wider flex-grow px-5 sm:px-10">
        Find all the articles on Software Engineering, Fullstack Development,
        etc.
      </p>
      <div className="flex flex-wrap flex-row items-center">
        <section className="text-gray-400 body-font flex-grow">
          <div className="p-5 sm:p-10 mx-auto">
            <div className="flex flex-wrap -m-4">{allPosts}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data }: { data: GET_ALL_POSTS } = await useApollo().query({
    query: getAllPosts,
  });

  return {
    props: {
      posts: data.posts,
    },
  };
};

export default blog;
