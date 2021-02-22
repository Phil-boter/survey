import axios from "./axios";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";

export default function Results({ surveyId, secretLink }) {
    const [results, setResults] = useState([]);
    const [link, setLink] = useState("");
    const [reAnswers, setReAnswers] = useState([]);

    useEffect(() => {
        console.log("Results mounted");
        axios.get(`/getQuestions/${surveyId}`).then(({ data }) => {
            console.log("data in results", data);
            setResults(data.rows);
            setLink(data.rows[0].link);
        });
    }, []);

    useEffect(() => {
        axios.get(`/getAnswers/${surveyId}`).then(({ data }) => {
            console.log("data in getAnswers", data.rows);
            setReAnswers(data.rows);
        });
    }, []);

    const copyToClipboard = (e) => {
        console.log("Copying to Clipboard", e.target);
        copy(`http://localhost:3000/participate/${surveyId}/${link}`);
    };

    return (
        <>
            <h1>You should really bookmark this page</h1>
            <h1>Your new Survey Results</h1>
            <section>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
            </section>
            <div>
                <button onClick={(e) => copyToClipboard(e)}>
                    Copy Link to ClipBoard
                </button>
            </div>
            <div>
                {results.map((result, index) => {
                    return (
                        <>
                            <div key={index}>
                                <h1>{result.question}</h1>
                            </div>
                            <>
                                {reAnswers && reAnswers.length != 0 ? (
                                    <h2>Your Answers:</h2>
                                ) : (
                                    <p>There are no answers so far</p>
                                )}
                            </>

                            {reAnswers &&
                                reAnswers.map((answer, questions_id) => {
                                    let id = result.id;
                                    console.log("resultId", id);
                                    if (questions_id == id) {
                                        return (
                                            <div key={answer.id}>
                                                <ul>
                                                    <li>
                                                        <p>{answer.answers}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        );
                                    } else {
                                        return;
                                    }
                                })}
                        </>
                    );
                })}
            </div>
        </>
    );
}
