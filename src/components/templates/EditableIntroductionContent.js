import React from "react";

import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import { default as EditableIntroductionList } from "../molecules/introduction/EditableIntroductionList";
import { default as EditableIntroductionPane } from "../molecules/introduction/EditableIntroductionPane";
import { Row, Col, Tab, Container, Button } from "react-bootstrap";
import { isEmpty } from "lodash";

import "./IntroductionContent.scss";

const EditableIntroductionContent = ({ intros, desc, onEdit, onRemove, onWrite }) => {
    const { auth } = useSelector(state => state.auth);
    if (isEmpty(intros)) return (
        <Container className="flex-grow-1 introduction-content">
            <div className="introduction-header-title">{desc}</div>
            {auth === "admin" ? (
                <div className="d-flex justify-content-start py-3">
                    <Button
                        variant="outline-primary"
                        className="mr-3"
                        onClick={() => onWrite()}
                    >
                        항목 추가
                    </Button>
                </div>
            ) : (
                <div />
            )}
        </Container>
    );

    return (
        <Container className="flex-grow-1 introduction-content">
            <div className="introduction-header-title">{desc}</div>
            <Tab.Container defaultActiveKey={`#${intros[0].id}`}>
                <Row>
                    <Col sm={5} md={4} lg={3} style={{ paddingBottom: "15px" }}>
                        <EditableIntroductionList intros={intros} />
                    </Col>
                    <Col>
                        <EditableIntroductionPane intros={intros} onEdit={onEdit} onRemove={onRemove} />
                    </Col>
                </Row>
            </Tab.Container>
            {auth === "admin" ? (
                <div className="d-flex justify-content-start py-3">
                    <Button
                        variant="outline-primary"
                        className="mr-3"
                        onClick={() => onWrite()}
                    >
                        항목 추가
                    </Button>
                </div>
            ) : (
                <div />
            )}
        </Container>
    );
};

export default withRouter(EditableIntroductionContent);
