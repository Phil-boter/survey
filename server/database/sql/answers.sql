DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    survey_id INT REFERENCES survey(id),
    questions_id INT REFERENCES questions(id),
    answers VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);