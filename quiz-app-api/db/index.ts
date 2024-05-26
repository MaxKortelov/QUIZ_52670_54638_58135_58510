import {Client, Pool, types} from "pg";
import { databaseOptions } from "../@shared/env-vars";
import { parse } from "date-fns"

const parseFn = function(val: string | null) {
  if (!val) return null
  const timeWithoutTimeZone = val.substring(0, 19);
  return parse(timeWithoutTimeZone, "yyyy-MM-dd HH:mm:ss", new Date()).toString();
}

types.setTypeParser(types.builtins.TIMESTAMPTZ, parseFn)
types.setTypeParser(types.builtins.TIMESTAMP, parseFn)

const db = process.env.NODE_ENV === "test" ? new Pool(databaseOptions) : new Client(databaseOptions);

export default db;
