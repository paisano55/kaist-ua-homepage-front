import React, { useState } from "react";

import { ListGroup } from "react-bootstrap";

const EditableIntroductionList = ({ intros }) => {
    /* const listData = intros.map(intro =>
    ({
        link: `${intro.mainId}`,
        title: intro.title
    })) */
    const listData2 = intros.map(intro => ({
        link: !intro.subId ? `${intro.id}` : `${intro.parentId}_${intro.subId}`,
        title: intro.title,
        isSubTab: !!intro.subId
    }))
    const listData = listData2.filter(intro => !intro.isSubTab)

    const [tabList, setTabList] = useState(listData);
    const [subTabs, setSubTabs] = useState(false);
    const handleClick = event => {
        const name = event.target.name;
        if (name.substring(0, 2) === "#3") {
            setTabList(listData2);
            setSubTabs(true);
        } else {
            setTabList(listData);
            setSubTabs(false);
        }
    };
    const handleMouseEnter = event => {
        const name = event.target.name;
        if (name.substring(0, 2) === "#3") {
            setTabList(listData2);
        }
    };
    const handleMouseLeave = event => {
        const name = event.target.name;
        if (name.substring(0, 2) === "#3" && !subTabs) {
            setTabList(listData);
        }
    };
    return (
        <ListGroup>
            {tabList.map(tab => (
                <ListGroup.Item
                    active={tab.active}
                    id={tab.link}
                    name={tab.link}
                    action
                    key={tab.link}
                    onClick={handleClick.bind(this)}
                    onMouseEnter={handleMouseEnter.bind(this)}
                    onMouseLeave={handleMouseLeave.bind(this)}
                    href={tab.link}
                    className={
                        !tab.isSubTab ? "introduction-button" : "introduction-sub-button"
                    }
                    variant={tab.variant}
                    subTab={tab.isSubTab}
                >
                    {tab.title}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};
export default EditableIntroductionList;
