CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE quiz_session (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_sequence UUID[],
    question_answer jsonb,

    question_type_id UUID,
    FOREIGN KEY (question_type_id) REFERENCES question_type(uuid),
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES "user" (uuid)
);