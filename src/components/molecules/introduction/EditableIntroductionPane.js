import React from "react";

import { useSelector } from "react-redux";
import { Tab, Button } from "react-bootstrap";

const EditableIntroductionPane = (intros) => {
    const { auth } = useSelector(state => state.auth);

    return (
        <Tab.Content>
            {intros.intros ? intros.intros.map(intro =>
                <Tab.Pane eventKey={!intro.subId ? `#${intro.id}` : `#${intro.parentId}_${intro.subId}`}>
                    <div dangerouslySetInnerHTML={{ __html: intro.korContent }}></div>
                </Tab.Pane>)
                : null}
        </Tab.Content>
    );
};
export default EditableIntroductionPane;
