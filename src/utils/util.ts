import { SortOrder, Options } from "./types";

// Default page size
const DEFAULT_PAGE_SIZE = 10;

const translateSortOrderToBool = (sortOrder?: SortOrder): boolean => {
  return sortOrder ? (sortOrder === "asc" ? true : false) : undefined;
}


/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (value !== null && typeof value === "object" && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pick = (object: object, keys: string[]): object => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

