CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
    uuid varchar DEFAULT uuid_generate_v4(),
    email varchar NOT NULL,
    password_hash bytea NOT NULL,
    password_salt varchar NOT NULL,
    username varchar NOT NULL DEFAULT '',
    deleted boolean DEFAULT false,
    date_created DATE DEFAULT CURRENT_DATE,
    date_updated DATE DEFAULT CURRENT_DATE
);
