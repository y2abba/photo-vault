/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto {
    onCreatePhoto {
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
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto {
    onUpdatePhoto {
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
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto {
    onDeletePhoto {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
