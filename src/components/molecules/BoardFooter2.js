import React from "react";
import { withRouter } from "react-router-dom";
import SearchBarContainer from "../containers/board/SearchBarContainer";
import { Button } from "react-bootstrap";
import PaginationContainer2 from "../containers/board/PaginationContainer2";
import "./BoardFooter.scss";

import { useSelector } from "react-redux";

const BoardFooter2 = ({ author, title, page, lastPage, history, boardId }) => {
  const { auth } = useSelector(state => state.auth);

  return (
    <div className="d-flex flex-column justify-content-center Board-footer">
      <PaginationContainer2
        author={author}
        title={title}
        page={page}
        lastPage={lastPage}
      />
      <div className="d-flex justify-content-between">
        {auth === "admin" ? (
          <Button
            variant="outline-primary"
            className="h-100 d-inline-block"
            onClick={() => history.push(`/web/admin/edit/${boardId}`)}
          >
            글 작성하기
          </Button>
        ) : (
            <div />
          )}

        {<SearchBarContainer className="d-inline-block" />}
      </div>
    </div>
  );
};

export default withRouter(BoardFooter2);
