import React from "react";
import { Header, Footer } from "../organisms";
import RuleEditorContentContainer from "../containers/editor/RuleEditorContentContainer";

const RuleEditPage = props => {
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
            <RuleEditorContentContainer id={id} />
            <Footer />
        </div>
    );
};

export default RuleEditPage;
