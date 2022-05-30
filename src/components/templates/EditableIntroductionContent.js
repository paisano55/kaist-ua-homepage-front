import React from "react";

import { default as EditableIntroductionList } from "../molecules/introduction/EditableIntroductionList";
import { default as EditableIntroductionPane } from "../molecules/introduction/EditableIntroductionPane";
import { Row, Col, Tab, Container, Button } from "react-bootstrap";

import "./IntroductionContent.scss";

const EditableIntroductionContent = ({ intros }) => {
    return (
        <Container className="flex-grow-1 introduction-content">
            <div className="introduction-header-title">총학 소개 </div>
            <Tab.Container defaultActiveKey="#1">
                <Row>
                    <Col sm={5} md={4} lg={3} style={{ paddingBottom: "15px" }}>
                        <EditableIntroductionList intros={intros} />
                    </Col>
                    <Col>
                        <EditableIntroductionPane intros={intros} />
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default EditableIntroductionContent;
