CREATE TABLE chat_questions (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question VARCHAR(200) NOT NULL
);