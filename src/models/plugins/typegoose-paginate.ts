import mongoosePaginate from "mongoose-paginate-v2";
import { FilterQuery, PaginateOptions, PaginateResult } from "mongoose";

export type PaginateMethod<T> = (
  query?: FilterQuery<T>,
  options?: PaginateOptions,
  callback?: (err: any, result: PaginateResult<T>) => void,
) => Promise<PaginateResult<T>>;

export const typegoosePaginate = mongoosePaginate;
