import React from "react";
import { useSelector } from "react-redux";
import { Container, Form, Col } from "react-bootstrap";
import { EditorFormGroup } from "../molecules";
import "./EditorHeader.scss";

const EditorHeader = ({ onChangeField }) => {
  const onChange = (key, e) => {
    onChangeField({ key, value: e.target.value });
  };

  const post = useSelector(({ post }) => post);

  return (
    <Container className="border-bottom mt-3">
      <Form>
        <Form.Row>
          <EditorFormGroup
            groupAs={Col}
            label="작성자 (한글)"
            placeholder="예) 윤현식"
            onChange={e => onChange("korAuthor", e)}
            value={post.korAuthor}
          />
          <EditorFormGroup
            groupAs={Col}
            label="Author (English)"
            placeholder="예) Hyunsik Yoon"
            onChange={e => onChange("engAuthor", e)}
            value={post.engAuthor}
          />
        </Form.Row>
        <EditorFormGroup
          label="제목 (한글)"
          onChange={e => onChange("korTitle", e)}
          value={post.korTitle}
        />
        <EditorFormGroup
          label="Title (English)"
          onChange={e => onChange("engTitle", e)}
          value={post.engTitle}
        />
      </Form>
    </Container>
  );
};

export default EditorHeader;
