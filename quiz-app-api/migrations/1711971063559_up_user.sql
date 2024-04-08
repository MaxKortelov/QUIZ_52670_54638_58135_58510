CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email varchar NOT NULL,
    password_hash bytea NOT NULL,
    password_salt varchar NOT NULL,
    username varchar NOT NULL DEFAULT '',
    deleted boolean DEFAULT false,
    date_created DATE DEFAULT CURRENT_DATE,
    date_updated DATE DEFAULT CURRENT_DATE,
    reset_password_token varchar,
    verify_email_token varchar,
    user_confirmed boolean DEFAULT false
);