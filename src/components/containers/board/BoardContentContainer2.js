import React, { useCallback, useEffect } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BoardContent2 from "../../templates/BoardContent2";
import * as boardsAPI from "../../../lib/api/board";
import * as postsAPI from "../../../lib/api/post";
import { setBoards2 } from "../../../modules/boards";
import { listPosts2 } from "../../../modules/posts";

const BoardContentContainer2 = ({ location, boardId, history }) => {
  const dispatch = useDispatch();
  const { posts, boards } = useSelector(({ posts, boards }) => ({
    posts: posts.posts2,
    boards: boards.boards2
  }));

  const { author, korTitle, engTitle, page, page2 } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const redirect = useCallback(() => {
    if (!page2) history.push(`${location.pathname}?page=${page ? page : 1}&page2=1`);
  }, [page, page2, history, location.pathname]);

  useEffect(() => {
    redirect();
  }, [location.pathname, boardId, redirect]);

  const getBoardsList = useCallback(() => {
    boardsAPI
      .list()
      .then(res1 => {
        dispatch(setBoards2(res1.data));

        postsAPI
          .list({ author, korTitle, engTitle, page: page2, boardId })
          .then(res2 => {
            const { posts, lastPage } = res2.data;
            dispatch(listPosts2({ posts, lastPage }));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, [dispatch, author, boardId, page2, korTitle, engTitle]);

  useEffect(() => {
    getBoardsList();
  }, [dispatch, location.search, getBoardsList]);

  return <BoardContent2 boards={boards} boardId={boardId} posts={posts} />;
};

export default withRouter(BoardContentContainer2);
