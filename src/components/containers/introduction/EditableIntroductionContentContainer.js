import React, { useCallback, useEffect } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditableIntroductionContent from "../../templates/EditableIntroductionContent"
import * as introAPI from "../../../lib/api/intro"
import { listIntros } from "../../../modules/intros";
import { isEmpty } from "lodash";

const EditableIntroductionContentContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const { intros } = useSelector(({ intros }) => ({
    intros: intros.intros
  }));

  const { korTitle, engTitle } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const getIntrosList = useCallback(() => {

    introAPI
      .list({ korTitle, engTitle })
      .then(res2 => {
        const { intros } = res2.data;
        dispatch(listIntros({ intros }));
      })
      .catch(err => console.log(err));
  }, [dispatch, korTitle, engTitle]);

  useEffect(() => {
    getIntrosList();
  }, [dispatch, location.search, getIntrosList]);

  return <EditableIntroductionContent intros={intros} />;
};

export default withRouter(EditableIntroductionContentContainer);
