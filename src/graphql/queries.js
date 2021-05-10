/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        balance
        createdAt
        updatedAt
        photos {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      balance
      createdAt
      updatedAt
      photos {
        items {
          id
          title
          price
          url
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listPhotos = /* GraphQL */ `
  query ListPhotos(
    $filter: ModelPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        price
        url
        userID
        createdAt
        updatedAt
        user {
          id
          name
          balance
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPhoto = /* GraphQL */ `
  query GetPhoto($id: ID!) {
    getPhoto(id: $id) {
      id
      title
      price
      url
      userID
      createdAt
      updatedAt
      user {
        id
        name
        balance
        createdAt
        updatedAt
        photos {
          nextToken
        }
      }
      comments {
        items {
          id
          photoID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      photoID
      content
      createdAt
      updatedAt
      photo {
        id
        title
        price
        url
        userID
        createdAt
        updatedAt
        user {
          id
          name
          balance
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
      }
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        photoID
        content
        createdAt
        updatedAt
        photo {
          id
          title
          price
          url
          userID
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
