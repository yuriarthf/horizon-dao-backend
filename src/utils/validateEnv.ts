import { cleanEnv, port } from "envalid";
import process from "process";

const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
  });
};

export default validateEnv;
