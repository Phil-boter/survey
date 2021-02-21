import axios from "./axios";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";

export default function Results({ surveyId }) {
    console.log("surveyId", surveyId);
    const [results, setResults] = useState([]);
    const [link, setLink] = useState("");

    useEffect(() => {
        console.log("Results mounted");
        axios.get(`/getQuestions/${surveyId}`).then(({ data }) => {
            console.log("data in results", data);
            setResults(data.rows);
            setLink(data.rows[0].link);
        });
    }, []);

    const copyToClipboard = (e) => {
        console.log("Copying to Clipboard", e.target);
        copy(`http://localhost:3000/answers/${surveyId}/${link}`);
    };

    return (
        <>
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
                {results.map((result, index) => {
                    return <div key={index}>{result.question}</div>;
                })}
            </div>
        </>
    );
}
