DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    survey_id INT REFERENCES survey(id),
    order_id INT NOT NULL,
    question VARCHAR(255),
    link VARCHAR(255) NOT NULL
);