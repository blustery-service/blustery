import { flatMap } from 'lodash';

export default function objectsToArray(object: Record<string, any>): string[] {
  const mapValues = Object.values(object).map((value) => {
    if (typeof value === 'string') {
      return [value];
    } else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return objectsToArray(value);
    }
    return [];
  });

  return flatMap(mapValues);
}
