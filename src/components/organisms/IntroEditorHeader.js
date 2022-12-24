import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Form } from "react-bootstrap";
import { EditorFormGroup } from "../molecules";
import * as introAPI from "../../lib/api/intro"
import "./EditorHeader.scss";

const IntroEditorHeader = ({ onChangeField, isEdit }) => {
    const onChange = (key, e) => {
        onChangeField({ key, value: e.target.value });
    };
    const intro = useSelector(({ intro }) => intro);
    const [intros, setIntros] = useState([]);
    useEffect(() => {
        introAPI
            .list()
            .then(res => {
                setIntros(res.data);
            })
            .catch(err => console.log(err));
    }, []);

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
                <select className="form-control" variant="outline-primary" value={intro.parentId} onChange={e => onChange("parentId", e)} disabled={isEdit}>
                    <option value="None">대항목</option>
                    {intros.intros ? intros.intros.filter(intro => !intro.parentId).map(intro => <option value={intro.id}>"{intro.korTitle}" 의 소항목</option>) : null}
                </select>
            </Form>
        </Container>
    );
};

export default IntroEditorHeader;
