DROP TABLE IF EXISTS survey CASCADE;

CREATE TABLE survey (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);