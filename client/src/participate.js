import axios from "./axios";
import { useEffect, useState } from "react";

export default function Participate({ surveyId, secretLink }) {
    const [questions, setPartQest] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        console.log("Participate mounted");
        axios.get(`/getQuestions/${surveyId}`).then(({ data }) => {
            console.log("data in results", data);
            setPartQest(data.rows);
        });
    }, []);

    const handleInput = (e) => {
        e.preventDefault();
        console.log("input");
        console.log("answer value", e.target.value);
        setAnswers({ ...answers, [e.target.id]: e.target.value });
    };

    const submitAnswer = (e) => {
        e.preventDefault();
        console.log("submit Answer");
        axios
            .post(`/answer/${surveyId}`)
            .then(() => {
                console.log("post answer");
            })
            .catch((error) => {
                console.log("error in post answer", error);
            });
    };

    return (
        <>
            <h1>Your new Survey</h1>
            <section>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
            </section>

            <h1>Results</h1>
            <div>
                {questions.map((question, index) => {
                    return (
                        <div key={index}>
                            <h2>{question.question}</h2>
                            <form>
                                <input onChange={(e) => handleInput(e)}></input>
                                <button onClick={(e) => submitAnswer(e)}>
                                    submit Answer
                                </button>
                            </form>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
