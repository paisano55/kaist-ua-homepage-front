import React from "react";

import { Header, Footer } from "../organisms";
import IntroductionContentContainer from "../containers/introduction/IntroductionContentContainer";

const EditableIntroductionPage = props => {
    const { boardId } = props.match.params;
    return (
        <div
            style={{ minHeight: "100vh", fontFamily: "NanumSquare" }}
            className="d-flex flex-column"
        >
            <Header active="0" />
            <IntroductionContentContainer />
            <Footer />
        </div>
    );
};

export default EditableIntroductionPage;
