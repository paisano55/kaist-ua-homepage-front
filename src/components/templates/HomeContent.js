import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./HomeContent.scss";
import { HomeCarousel, BoardModule } from "../organisms";
// import { isEmpty } from "lodash";

const HomeContent = ({ BoardModuleInfos }) => {
  const boardModules = BoardModuleInfos.map(boardModuleInfo => (
    <Col key={boardModuleInfo.board.id} lg="6">
      <BoardModule
        className="module"
        posts={boardModuleInfo.posts}
        board={boardModuleInfo.board}
      />
    </Col>
  ));

  return (
    <Container className="flex-grow-1 home-content">
      <HomeCarousel className="module" />
      <Row>{boardModules}</Row>
      <div className="ad-banner">
        <div className="ad-box">
          <a href="https://student.kaist.ac.kr/wiki/">
            <img
              className="ad"
              src="https://kaistua-web.s3.ap-northeast-2.amazonaws.com/logo-kaipedia.png"
              alt="ad here"
            />
          </a>
        </div>
        <div className="ad-box">
          <a href="https://ara.kaist.ac.kr">
            <img
              className="ad"
              src="https://kaistua-web.s3.ap-northeast-2.amazonaws.com/logo-ara.png"
              alt="ad here"
            />
          </a>
        </div>
        <div className="ad-box">
          <img
            className="ad"
            src="https://kaistua-web.s3.ap-northeast-2.amazonaws.com/ad-legochembio.jpg"
            alt="ad here"
          />
        </div>
      </div>
    </Container>
  );
};

export default HomeContent;
