import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { init, setIntro, changeField } from "../../../modules/intro";
import { IntroEditorContent } from "../../templates";
import { withRouter } from "react-router-dom";
import * as rulesAPI from "../../../lib/api/rule"

const RuleEditorContentContainer = ({ history, id }) => {
    const dispatch = useDispatch();
    const rule = useSelector(({ intro }) => intro);
    const [rules, setRules] = useState([]);
    useEffect(() => {
        rulesAPI
            .list()
            .then(res => {
                setRules(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
        dispatch
    ]);

    const onCancel = () => {
        history.goBack();
    };

    const onWrite = () => {
        console.log(rule);
        rulesAPI
            .write(rule)
            .then(res => {
                history.push(`/web/rule/`);
            })
            .catch(err => console.log(err));
    };

    const onEdit = () => {
        rulesAPI
            .update(id, rule)
            .then(res => {
                history.push(`/web/rule/`);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (id) {
            rulesAPI
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
            initialContent={id ? { korContent: rule.korContent, engContent: rule.engContent } : null}
            description={"학생회칙"}
            intros={rules}
        />
    );
};

export default withRouter(RuleEditorContentContainer);