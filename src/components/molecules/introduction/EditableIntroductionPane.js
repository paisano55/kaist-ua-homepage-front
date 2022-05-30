import React from "react";

import { Tab, Button } from "react-bootstrap";

const EditableIntroductionPane = (intros) => {
    return (
        <Tab.Content>
            { intros.intros ? intros.intros.map(intro => 
            <Tab.Pane eventKey={!intro.subId ? `#${intro.id}` : `#${intro.parentId}_${intro.subId}`}> 
                <div dangerouslySetInnerHTML={{__html: intro.korContent }}></div>
            </Tab.Pane>) 
            : null }
        </Tab.Content>
    );
};
export default EditableIntroductionPane;
