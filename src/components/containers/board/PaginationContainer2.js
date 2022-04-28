import React from "react";
import Pagination2 from "../../atoms/Pagination2";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "qs";

const PaginationContainer2 = ({ location }) => {
  const { lastPage, posts } = useSelector(({ posts }) => ({
    lastPage: posts.lastPage2,
    posts: posts.posts2
  }));

  if (!posts) return null;

  const { author, title, page, page2 } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  return (
    <Pagination2 author={author} title={title} page={page} page2={page2} lastPage={lastPage} />
  );
};

export default withRouter(PaginationContainer2);
