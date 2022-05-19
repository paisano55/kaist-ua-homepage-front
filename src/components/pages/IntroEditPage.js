import React from "react";
import { Header, Footer } from "../organisms";
import IntroEditorContentContainer from "../containers/editor/IntroEditorContentContainer";

const IntroEditPage = props => {
    const { boardId, mainId, subId } = props.match.params;
    return (
        <div
            style={{
                minHeight: "100vh",
                // backgroundColor: "#eee",
                fontFamily: "NanumSquare"
            }}
            className="d-flex flex-column"
        >
            <Header active={boardId} />
            <IntroEditorContentContainer mainId={mainId} subId={subId} />
            <Footer />
        </div>
    );
};

export default IntroEditPage;
