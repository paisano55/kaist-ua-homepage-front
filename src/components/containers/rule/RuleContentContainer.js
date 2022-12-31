import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditableIntroductionContent from "../../templates/EditableIntroductionContent"
import * as rulesAPI from "../../../lib/api/rule"

const RuleContentContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [rules, setRules] = useState([]);

  const getRulesList = useCallback(() => {
    rulesAPI
      .list()
      .then(res => {
        setRules(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const onWrite = () => {
    history.push(`/web/admin/edit/rule/`)
  };

  const onEdit = (id) => {
    history.push(`/web/admin/edit/rule/${id}/`)
  };

  const onRemove = (id) => {
    rulesAPI
      .remove(id)
      .then(res => history.push(`/web/rule`))
      .catch(err => console.log(err));
    window.location.reload();
  };

  useEffect(() => {
    getRulesList();
  }, [dispatch, getRulesList]);

  return <EditableIntroductionContent intros={rules} desc={"학생회칙"} onEdit={onEdit} onRemove={onRemove} onWrite={onWrite} />;
};

export default withRouter(RuleContentContainer);
