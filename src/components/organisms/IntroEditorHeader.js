import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Form } from "react-bootstrap";
import { EditorFormGroup } from "../molecules";
import "./EditorHeader.scss";

const IntroEditorHeader = ({ onChangeField, isEdit, intros }) => {
    const onChange = (key, e) => {
        onChangeField({ key, value: e.target.value });
    };
    const intro = useSelector(({ intro }) => intro);
    const [prevIntros, setPrevIntros] = useState(intros);

    const handleParentIdChange = (e) => {
        onChange("parentId", e);
        setPrevIntros(intros.filter(intro => intro.parentId === e.target.value));
    };

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

                {!isEdit ? <Form.Label>추가할 항목 선택</Form.Label> : <Form.Label>편집 시에는 항목 선택이 불가합니다.</Form.Label>}
                <select className="form-control" variant="outline-primary" value={intro.parentId} onChange={handleParentIdChange} disabled={isEdit}>
                    <option value="None">대항목</option>
                    {intros ? intros.filter(intro => !intro.parentId).map(intro => <option value={intro.id}>"{intro.korTitle}" 의 소항목</option>) : null}
                </select>

                {!isEdit ? <Form.Label>추가할 위치 선택</Form.Label> : <Form.Label>편집 시에는 항목 선택이 불가합니다.</Form.Label>}
                <select className="form-control" variant="outline-primary" value={intro.prevId} onChange={e => onChange("prevId", e)} disabled={isEdit}>
                    {!intros ? <option value="None">첫 대항목 추가</option> : null}
                    {prevIntros ? prevIntros.map(intro => <option value={intro.id}>"{intro.korTitle}" 뒤에 추가</option>) : <option value="None">첫 소항목 추가</option>}
                </select>
            </Form>
        </Container>
    );
};

export default IntroEditorHeader;
