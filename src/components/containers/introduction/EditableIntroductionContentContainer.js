import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditableIntroductionContent from "../../templates/EditableIntroductionContent"
import * as introAPI from "../../../lib/api/intro"

const EditableIntroductionContentContainer = () => {
  const dispatch = useDispatch();
  const [intros, setIntros] = useState([]);

  const getIntrosList = useCallback(() => {
    introAPI
      .list()
      .then(res => {
        setIntros(res.data.intros);
      })
      .catch(err => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    getIntrosList();
  }, [dispatch, getIntrosList]);

  return <EditableIntroductionContent intros={intros} />;
};

export default withRouter(EditableIntroductionContentContainer);
