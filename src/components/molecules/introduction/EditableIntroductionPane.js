import React from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Tab, Button } from "react-bootstrap";
import * as IntroAPI from "../../../lib/api/intro";

const EditableIntroductionPane = ({ intros, history }) => {
    const { t } = useTranslation(["Introduction"]);
    const { auth } = useSelector(state => state.auth);

    const onEdit = (id) => {
        history.push(`/web/admin/edit/introduction/${id}/`)
    };

    const onRemove = (id) => {
        IntroAPI
            .remove(id)
            .then(res => history.push(`/web/introduction`))
            .catch(err => console.log(err));
        window.location.reload();
    };

    return (
        <Tab.Content>
            {intros ? intros.map((intro, index) =>
                <Tab.Pane eventKey={!intro.subId ? `#${intro.id}` : `#${intro.parentId}_${intro.subId}`} key={index}>
                    {auth === "admin" ? (
                        <div className="d-flex justify-content-start py-3">
                            <Button
                                variant="outline-primary"
                                className="mr-3"
                                onClick={() => onEdit(intro.id)}
                            >
                                수정
                            </Button>
                            <Button
                                variant="outline-primary"
                                onClick={() => onRemove(intro.id)}
                            >
                                삭제
                            </Button>
                        </div>
                    ) : (
                        <div />
                    )}
                    <div dangerouslySetInnerHTML={{ __html: t("content", { intro: intro }) }}></div>
                </Tab.Pane>)
                : null}
        </Tab.Content >
    );
};
export default withRouter(EditableIntroductionPane);
