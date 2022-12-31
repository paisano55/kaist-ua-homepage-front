import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditableIntroductionContent from "../../templates/EditableIntroductionContent"
import * as introAPI from "../../../lib/api/intro"

const EditableIntroductionContentContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [intros, setIntros] = useState([]);

  const getIntrosList = useCallback(() => {
    introAPI
      .list()
      .then(res => {
        setIntros(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const onWrite = () => {
    history.push(`/web/admin/edit/introduction/`)
  };

  const onEdit = (id) => {
    history.push(`/web/admin/edit/introduction/${id}/`)
  };

  const onRemove = (id) => {
    introAPI
      .remove(id)
      .then(res => history.push(`/web/introduction`))
      .catch(err => console.log(err));
    window.location.reload();
  };

  useEffect(() => {
    getIntrosList();
  }, [dispatch, getIntrosList]);

  return <EditableIntroductionContent intros={intros} desc={"총학 소개"} onEdit={onEdit} onRemove={onRemove} onWrite={onWrite} />;
};

export default withRouter(EditableIntroductionContentContainer);
