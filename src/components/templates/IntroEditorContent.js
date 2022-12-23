import React from "react";

import { Container } from "react-bootstrap";

import { IntroEditorHeader, EditorFooter, Editor } from "../organisms";

import "./EditorContent.scss";

const IntroEditorContent = ({ onChangeField, onWrite, onCancel, initialContent }) => {
    return (
        <Container className="flex-grow-1 board-content">
            {initialContent ? <h2> 총학 소개 편집 </h2> : <h2> 총학 소개 추가 </h2>}
            <IntroEditorHeader onChangeField={onChangeField} isEdit={!!initialContent} />
            <Editor
                onChangeField={onChangeField}
                placeholder="한글 내용을 작성하세요..."
                keyName="korContent"
                initialContent={initialContent ? initialContent.korContent : null}
            />
            <Editor
                onChangeField={onChangeField}
                placeholder="영문 내용을 작성하세요..."
                keyName="engContent"
                initialContent={initialContent ? initialContent.engContent : null}
            />
            <EditorFooter onWrite={onWrite} onCancel={onCancel} />
        </Container>
    );
};

export default IntroEditorContent;
