import React from "react";

import { Header, Footer } from "../organisms";
import EditableIntroductionContentContainer from "../containers/introduction/EditableIntroductionContentContainer";

const EditableIntroductionPage = () => {
    return (
        <div
            style={{ minHeight: "100vh", fontFamily: "NanumSquare" }}
            className="d-flex flex-column"
        >
            <Header active="0" />
            <EditableIntroductionContentContainer />
            <Footer />
        </div>
    );
};

export default EditableIntroductionPage;
