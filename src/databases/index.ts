import { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } from "@config";

export const dbConnection = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE ?? ""}`;
