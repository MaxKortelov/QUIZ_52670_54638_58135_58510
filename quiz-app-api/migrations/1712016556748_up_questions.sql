CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE question_type (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description VARCHAR(200) NOT NULL,
    CONSTRAINT description_unique UNIQUE (description)
);

CREATE TABLE question (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_text TEXT NOT NULL,
    correct_answers TEXT[],
    question_type_id UUID,
    FOREIGN KEY (question_type_id) REFERENCES question_type(uuid)
);

CREATE TABLE answer (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    answer_text TEXT NOT NULL,
    question_id UUID,
    FOREIGN KEY (question_id) REFERENCES question(uuid)
);
