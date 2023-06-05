import { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } from "@config";

// PROD requires the +srv

const extra = DB_DATABASE === "test" ? "" : "+srv";

export const dbConnection = `mongodb${extra}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE ?? ""}`;
