import React from "react";
import { Pagination } from "react-bootstrap";
import qs from "qs";

export default ({ author, title, page, page2, lastPage }) => {
  const buildUrl = (author, title, page, page2) => {
    const queryString = qs.stringify({ author, title, page, page2 });
    return `?${queryString}`;
  };

  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.First
        style={{ fontFamily: "arial" }}
        href={buildUrl(author, title, page, 1)}
      />
      {page2 > 1 && (
        <Pagination.Item href={buildUrl(author, title, page, page2 - 1)}>
          {page2 - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page2}</Pagination.Item>
      {page2 < lastPage && (
        <Pagination.Item href={buildUrl(author, title, page, parseInt(page2) + 1)}>
          {parseInt(page2) + 1}
        </Pagination.Item>
      )}
      <Pagination.Last
        style={{ fontFamily: "arial" }}
        href={buildUrl(author, title, lastPage)}
      />
    </Pagination>
  );
};
