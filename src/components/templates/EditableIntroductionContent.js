import React from "react";

import { default as EditableIntroductionList } from "../molecules/introduction/EditableIntroductionList";
import { default as EditableIntroductionPane } from "../molecules/introduction/EditableIntroductionPane";
import { Row, Col, Tab, Container, Button } from "react-bootstrap";

import { useSelector } from "react-redux";

import "./IntroductionContent.scss";

const EditableIntroductionContent = ({ intros }) => {
    const { auth } = useSelector(state => state.auth);

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
            {auth === "admin" ? (
                <Button
                    variant="outline-primary"
                    className="h-100 d-inline-block"
                    href="/web/admin/edit/introduction"
                >
                    대항목 추가
                </Button>
            ) : (
                <div />
            )}
            {auth === "admin" ? (
                <Button
                    variant="outline-primary"
                    className="h-100 d-inline-block"
                    href="/web/admin/edit/introduction"
                >
                    소항목 추가
                </Button>
            ) : (
                <div />
            )}
        </Container>
    );
};

export default EditableIntroductionContent;
