import React, { useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "./Editor.scss";

const Editor = ({ onChangeField, placeholder, keyName, initialContent }) => {
  const korContentQuill = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(korContentQuill.current, {
      theme: "bubble",
      placeholder,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"]
        ]
      }
    });

    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user")
        onChangeField({ key: keyName, value: quill.root.innerHTML });
    });
  }, [onChangeField, keyName, placeholder]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    if (initialContent === "") return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = initialContent;
  }, [initialContent]);

  return (
    <Container className="border-bottom" style={{ height: "300px" }}>
      <div ref={korContentQuill} />
    </Container>
  );
};

export default Editor;
