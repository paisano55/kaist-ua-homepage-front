import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { init, setIntro, changeField } from "../../../modules/intro";
import { IntroEditorContent } from "../../templates";
import { withRouter } from "react-router-dom";
import * as introsAPI from "../../../lib/api/intro"

const IntroEditorContentContainer = ({ history, id }) => {
    const dispatch = useDispatch();
    const intro = useSelector(({ intro }) => intro);

    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
        dispatch
    ]);

    const onCancel = () => {
        history.goBack();
    };

    const onWrite = () => {
        console.log(intro);
        introsAPI
            .write(intro)
            .then(res => {
                history.push(`/web/introduction/`);
            })
            .catch(err => console.log(err));
    };

    const onEdit = () => {
        introsAPI
            .update(id, intro)
            .then(res => {
                history.push(`/web/introduction/${id}`);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (id) {
            introsAPI
                .read(id)
                .then(res => {
                    dispatch(setIntro(res.data));
                })
                .catch(err => console.log(err));
        };
    }, [id, dispatch]);


    useEffect(() => {
        return () => {
            dispatch(init());
        };
    }, [dispatch]);

    return (
        <IntroEditorContent
            onChangeField={onChangeField}
            onWrite={id ? onEdit : onWrite}
            onCancel={onCancel}
            initialContent={id ? { korContent: intro.korContent, engContent: intro.engContent } : null}
        />
    );
};

export default withRouter(IntroEditorContentContainer);