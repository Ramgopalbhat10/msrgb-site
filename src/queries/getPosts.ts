import { gql } from "@apollo/client";

export const getAllPosts = gql`
  query GET_ALL_POSTS {
    posts {
      id
      title
      description
      content
      slug
      category
      thumbnail {
        name
        url
      }
    }
  }
`;

export const getAllPosts_slug = gql`
  query GET_ALL_POSTS_SLUG {
    posts {
      slug
    }
  }
`;

export const getPostBySlug = gql`
  query GET_ALL_POSTS_BY_SLUG($slug: String!) {
    posts(where: { slug: $slug }) {
      title
      description
      content
      updated_at
      thumbnail {
        name
        url
      }
    }
  }
`;
