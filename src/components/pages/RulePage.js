import React from "react";

import { Header, Footer } from "../organisms";
import RuleContentContainer from "../containers/rule/RuleContentContainer";

const RulePage = () => {
    return (
        <div
            style={{ minHeight: "100vh", fontFamily: "NanumSquare" }}
            className="d-flex flex-column"
        >
            <Header active="rule" />
            <RuleContentContainer />
            <Footer />
        </div>
    );
};

export default RulePage;
