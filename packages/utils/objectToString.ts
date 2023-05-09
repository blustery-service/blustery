import { toArray, toString } from 'lodash';
import objectsToArray from './objectsToArray';

export const objectToString = (object: Object) => {
  return objectsToArray(object).join(' ');
};
