import objectsToArray from './objectsToArray';

export default function objectsToString(object: object) {
  return objectsToArray(object).join(' ');
}
