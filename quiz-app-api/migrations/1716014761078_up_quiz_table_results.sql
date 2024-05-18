CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE quiz_table_results (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_amount_taken int DEFAULT 0,
    correct_answers int DEFAULT 0,

    best_quiz_session_id UUID,
    FOREIGN KEY (best_quiz_session_id) REFERENCES quiz_session(uuid),
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES "user" (uuid)
);