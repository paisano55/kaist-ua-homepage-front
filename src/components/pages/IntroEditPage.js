import React from "react";
import { Header, Footer } from "../organisms";
import IntroEditorContentContainer from "../containers/editor/IntroEditorContentContainer";

const IntroEditPage = props => {
    const { id } = props.match.params;
    return (
        <div
            style={{
                minHeight: "100vh",
                // backgroundColor: "#eee",
                fontFamily: "NanumSquare"
            }}
            className="d-flex flex-column"
        >
            <Header active="0" />
            <IntroEditorContentContainer id={id} />
            <Footer />
        </div>
    );
};

export default IntroEditPage;
