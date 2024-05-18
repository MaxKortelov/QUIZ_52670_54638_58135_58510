CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE quiz_session (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_sequence UUID[],
    question_answer jsonb NOT NULL DEFAULT '{}'::jsonb,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_started TIMESTAMP,
    date_ended TIMESTAMP,
    duration int DEFAULT 30,
    attempts int DEFAULT 10,
    attempts_used int DEFAULT 0,
    result int DEFAULT NULL,

    question_type_id UUID,
    FOREIGN KEY (question_type_id) REFERENCES question_type(uuid),
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES "user" (uuid)
);