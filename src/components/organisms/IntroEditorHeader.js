import React from "react";
import { useSelector } from "react-redux";
import { Container, Form } from "react-bootstrap";
import { EditorFormGroup } from "../molecules";
import "./EditorHeader.scss";

const IntroEditorHeader = ({ onChangeField }) => {
    const onChange = (key, e) => {
        onChangeField({ key, value: e.target.value });
    };

    const intro = useSelector(({ intro }) => intro);

    return (
        <Container className="border-bottom mt-3">
            <Form>
                <EditorFormGroup
                    label="제목 (한글)"
                    onChange={e => onChange("korTitle", e)}
                    value={intro.korTitle}
                />
                <EditorFormGroup
                    label="Title (English)"
                    onChange={e => onChange("engTitle", e)}
                    value={intro.engTitle}
                />
            </Form>
        </Container>
    );
};

export default IntroEditorHeader;
