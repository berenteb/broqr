import * as db from "mongoose";
import { Configuration } from "../utils/configuration";
require("dotenv").config();
if (!Configuration.MONGO_DB_CONNECTION_STRING) {
  console.error("MongoDB URL nem létezik!");
  process.exit(1);
}
db.connect(Configuration.MONGO_DB_CONNECTION_STRING)
  .catch((e) => console.log(e))
  .then(() => {
    console.log("MongoDB connected!");
  });
export default db;
