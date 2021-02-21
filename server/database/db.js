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

module.exports.addQuestion = (surveyId, orderId, question, link) => {
    const q =
        "INSERT INTO questions (survey_id, order_id, question, link) VALUES($1, $2, $3, $4)";
    const params = [surveyId, orderId, question, link];
    return db.query(q, params);
};
