import axios from "./axios";
import { useEffect, useState } from "react";

import "./css/participate.css";

export default function Participate({ surveyId, secretLink }) {
    const [questions, setPartQest] = useState([]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("Participate mounted");
        axios
            .get(`/getQuestions/${surveyId}`)
            .then(({ data }) => {
                console.log("data in results", data);
                setPartQest(data.rows);
            })
            .catch((error) => {
                console.log("error in get survey", error);
                setError(true);
            });
    }, []);

    const handleInput = (e) => {
        console.log("input");
        console.log("answer value", e.target.value);
        console.log("answer id", e.target.id);
        setAnswers({ ...answers, [e.target.id]: e.target.value });
    };

    const submitAnswer = (e) => {
        e.preventDefault();
        console.log("submit Answer");
        axios
            .post(`/answer`, {
                surveyId: surveyId,
                answers: answers,
            })
            .then(() => {
                console.log("success submit answer");
                location.replace(`/thankyou`);
            })
            .catch((error) => {
                console.log("errot in Post answer", error);
                setError(true);
            });
    };

    return (
        <>
            <h1 className="survey-headline">Your new Survey</h1>
            <section>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
            </section>
            {error && <p>Sorry! something went wrong...</p>}
            <div className="result-container">
                {questions.map((question, index) => {
                    return (
                        <div key={index}>
                            <ul>
                                <li key={index}>
                                    {/* <h2>{`question ${index + 1}`}</h2> */}
                                    <h3>{question.question.toUpperCase()}</h3>
                                    <input
                                        name="answer"
                                        onChange={(e) => handleInput(e)}
                                        placeholder="enter answer"
                                        type="text"
                                        id={question.id}
                                    ></input>
                                </li>
                            </ul>
                        </div>
                    );
                })}
                <button
                    className="button submit"
                    onClick={(e) => submitAnswer(e)}
                >
                    Submit Answer
                </button>
            </div>
        </>
    );
}
