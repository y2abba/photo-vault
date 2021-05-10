import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class User {
  readonly id: string;
  readonly name: string;
  readonly balance: number;
  readonly photos?: (Photo | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Photo {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly url: string;
  readonly user?: User;
  readonly comments?: (Comment | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Photo>);
  static copyOf(source: Photo, mutator: (draft: MutableModel<Photo>) => MutableModel<Photo> | void): Photo;
}

export declare class Comment {
  readonly id: string;
  readonly photo?: Photo;
  readonly content: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}