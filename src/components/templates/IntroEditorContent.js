import React from "react";

import { Container } from "react-bootstrap";

import { IntroEditorHeader, EditorFooter, Editor } from "../organisms";

import "./EditorContent.scss";

const IntroEditorContent = ({ onChangeField, onWrite, onCancel, initialContent, intros, description }) => {
    return (
        <Container className="flex-grow-1 board-content">
            {initialContent ? <h2> {description} 편집 </h2> : <h2> {description} 추가 </h2>}
            <IntroEditorHeader onChangeField={onChangeField} isEdit={!!initialContent} intros={intros} />
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
