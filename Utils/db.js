import { connect } from "mongoose";
//files
import keys from "../Config/keys.js";

const DB = async () =>
  await connect(keys.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default DB;
