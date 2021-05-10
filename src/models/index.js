// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Photo, Comment } = initSchema(schema);

export {
  User,
  Photo,
  Comment
};