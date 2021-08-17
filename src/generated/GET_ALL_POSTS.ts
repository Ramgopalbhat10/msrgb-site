/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_ALL_POSTS
// ====================================================

export interface GET_ALL_POSTS_posts_thumbnail {
  __typename: "UploadFile";
  name: string;
  url: string;
}

export interface GET_ALL_POSTS_posts {
  __typename: "Posts";
  id: string;
  title: string | null;
  description: string | null;
  content: string | null;
  slug: string | null;
  category: string | null;
  thumbnail: (GET_ALL_POSTS_posts_thumbnail | null)[] | null;
}

export interface GET_ALL_POSTS {
  posts: (GET_ALL_POSTS_posts | null)[] | null;
}
