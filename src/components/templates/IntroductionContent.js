import React from "react";

import { default as IntroductionList } from "../molecules/introduction/IntroductionList";
import { default as IntroductionPane } from "../molecules/introduction/IntroductionPane";
import { Row, Col, Tab, Container } from "react-bootstrap";

import "./IntroductionContent.scss";

const IntroductionContent = ({ intros }) => {
  //const introList = introData.data.map(data => <ListGroup.Item action href={data.link}>{data.title}</ListGroup.Item>);
  //const introContent = introData.data.map(data => <Tab.Pane eventKey={data.link}>{data.content}</Tab.Pane>);
  return (
    <Container className="flex-grow-1 introduction-content">
      <div className="introduction-header-title">총학 소개</div>
      <Tab.Container defaultActiveKey="#1">
        <Row>
          <Col sm={5} md={4} lg={3} style={{ paddingBottom: "15px" }}>
            <IntroductionList />
          </Col>
          <Col>
            <IntroductionPane />
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default IntroductionContent;
