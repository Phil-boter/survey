const { query } = require("express");
const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/surveyapp"
);

module.exports.newSurvey = (title) => {
    const q = "INSERT INTO survey (title) VALUES ($1) RETURNING id";
    const params = [title];
    return db.query(q, params);
};

module.exports.addQuestion = (id, question) => {
    const q =
        "INSERT INTO questions (id, question) VALUES($1, $2) RETURNING id";
    const params = [id, question];
    return db.query(q, params);
};
