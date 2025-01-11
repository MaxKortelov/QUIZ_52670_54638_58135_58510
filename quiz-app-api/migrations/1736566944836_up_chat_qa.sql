CREATE TABLE chat_qa (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_pattern VARCHAR(200) NOT NULL UNIQUE,
    answer VARCHAR(500) NOT NULL
);