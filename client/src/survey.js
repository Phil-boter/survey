import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import "./css/app.css";
import "./css/survey.css";

export default function Survey() {
    return (
        <>
            <h1 className="survey-headline">Survey App</h1>
            <section>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                    iriure dolor in hendrerit in vulputate velit esse molestie
                    consequat, vel illum dolore eu feugiat nulla facilisis at
                    vero eros et accumsan et iusto odio dignissim qui blandit
                    praesent luptatum zzril delenit a
                </p>
            </section>
            <button className="button">
                <Link to="/create">Create new survey</Link>
            </button>
        </>
    );
}
