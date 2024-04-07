CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE question_type (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description VARCHAR(200) NOT NULL
);

CREATE TABLE question (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question VARCHAR(300) NOT NULL,
    correct_answer_id varchar,
    CONSTRAINT question_type_id FOREIGN KEY (uuid) REFERENCES question_type(uuid)
);

CREATE TABLE answer (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    answer VARCHAR(400) NOT NULL,
    CONSTRAINT question_id FOREIGN KEY (uuid) REFERENCES question(uuid)
);
