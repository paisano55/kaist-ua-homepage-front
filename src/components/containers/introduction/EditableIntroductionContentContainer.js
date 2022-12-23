import React, { useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditableIntroductionContent from "../../templates/EditableIntroductionContent"
import * as introAPI from "../../../lib/api/intro"
import { listIntros } from "../../../modules/intros";

const EditableIntroductionContentContainer = () => {
  const dispatch = useDispatch();
  const { intros } = useSelector(({ intros }) => ({
    intros: intros.intros
  }));

  const getIntrosList = useCallback(() => {
    introAPI
      .list()
      .then(res => {
        dispatch(listIntros(res.data));
      })
      .catch(err => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    getIntrosList();
  }, [dispatch, getIntrosList]);

  return <EditableIntroductionContent intros={intros} />;
};

export default withRouter(EditableIntroductionContentContainer);
