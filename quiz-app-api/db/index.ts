import { Client } from "pg";
import { databaseOptions } from "../@shared/env-vars";

const db = new Client(databaseOptions);

export default db;
