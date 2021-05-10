/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPhoto = /* GraphQL */ `
  mutation CreatePhoto(
    $input: CreatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    createPhoto(input: $input, condition: $condition) {
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
export const updatePhoto = /* GraphQL */ `
  mutation UpdatePhoto(
    $input: UpdatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    updatePhoto(input: $input, condition: $condition) {
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
export const deletePhoto = /* GraphQL */ `
  mutation DeletePhoto(
    $input: DeletePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    deletePhoto(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
