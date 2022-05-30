import React, { useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditableIntroductionContent from "../../templates/EditableIntroductionContent"
import * as introAPI from "../../../lib/api/intro"
import { listIntros } from "../../../modules/intros";

const EditableIntroductionContentContainer = ( location ) => {
  const dispatch = useDispatch();
  const { intros } = useSelector(({ intros }) => ({
    intros: intros.intros
  }));

  const getIntrosList = () => {
    introAPI
      .list()
      .then(res => {
        const { intros } = res.data;
        dispatch(listIntros({ intros }));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getIntrosList();
  }, [dispatch]);

  return <EditableIntroductionContent intros={intros} />;
};

export default withRouter(EditableIntroductionContentContainer);
