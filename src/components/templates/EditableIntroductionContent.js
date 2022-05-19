import React from "react";

import { default as EditableIntroductionList } from "../molecules/introduction/EditableIntroductionList";
import { default as EditableIntroductionPane } from "../molecules/introduction/EditableIntroductionPane";
import { Row, Col, Tab, Container } from "react-bootstrap";

import "./IntroductionContent.scss";

const EditableIntroductionContent = ({ intros }) => {
    //const introList = introData.data.map(data => <ListGroup.Item action href={data.link}>{data.title}</ListGroup.Item>);
    //const introContent = introData.data.map(data => <Tab.Pane eventKey={data.link}>{data.content}</Tab.Pane>);
    return (
        <Container className="flex-grow-1 introduction-content">
            <div className="introduction-header-title">총학 소개</div>
            <Tab.Container defaultActiveKey="#1">
                <Row>
                    <Col sm={5} md={4} lg={3} style={{ paddingBottom: "15px" }}>
                        <EditableIntroductionList />
                    </Col>
                    <Col>
                        <EdiatableIntroductionPane />
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default EditableIntroductionContent;
