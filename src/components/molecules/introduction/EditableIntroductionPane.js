import React, { Fragment, useState } from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Tab, Button } from "react-bootstrap";
import { CustomModal } from "../../organisms";

const EditableIntroductionPane = ({ intros, history, onEdit, onRemove }) => {
    const { t } = useTranslation(["Introduction"]);
    const { auth } = useSelector(state => state.auth);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(0);
    const handleDeleteModalClose = () => setShowDeleteConfirmModal(false);

    const childrenIntrosArray = intros.reduce((acc, intro) => {
        if (!intro.childrenList) return acc;
        return acc.concat(intro.childrenList);
    }, []);

    return (
        <Fragment>
            <Tab.Content>
                <CustomModal
                    title={`소개페이지 삭제`}
                    body={`해당 소개페이지를 삭제하시겠습니까? 하위 항목도 전부 삭제됩니다.`}
                    show={showDeleteConfirmModal}
                    handleConfirm={() => onRemove(idToDelete)}
                    handleClose={handleDeleteModalClose}
                    closeMessage="취소"
                    confirmMessage="확인"
                />
                {intros ? intros.map((intro) =>
                    <Tab.Pane eventKey={`#${intro.id}`} key={`${intro.id}`} >
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
                                    onClick={() => {
                                        setIdToDelete(intro.id);
                                        setShowDeleteConfirmModal(true);
                                    }}
                                >
                                    삭제
                                </Button>
                            </div>
                        ) : (
                            <div />
                        )}
                        <div dangerouslySetInnerHTML={{ __html: t("content", { intro: intro }) }}></div>
                    </Tab.Pane>
                )
                    : null}
                {childrenIntrosArray ? childrenIntrosArray.map((intro) =>
                    <Tab.Pane eventKey={`#${intro.parentId}_${intro.subId}`} key={`${intro.id}`} >
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
                                    onClick={() => {
                                        setIdToDelete(intro.id);
                                        setShowDeleteConfirmModal(true);
                                    }}
                                >
                                    삭제
                                </Button>
                            </div>
                        ) : (
                            <div />
                        )}
                        <div dangerouslySetInnerHTML={{ __html: t("content", { intro: intro }) }}></div>
                    </Tab.Pane>
                )
                    : null}
            </Tab.Content >
        </Fragment>
    );
};
export default withRouter(EditableIntroductionPane);
