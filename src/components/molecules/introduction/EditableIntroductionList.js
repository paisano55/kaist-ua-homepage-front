import React, { useState, useEffect, useCallback } from "react";

import { ListGroup } from "react-bootstrap";

const EditableIntroductionList = (intros) => {
    const [listData2, setListData2] = useState([]);
    const [listData, setListData1] = useState([]);
    const [tabList, setTabList] = useState(listData);
    const [subTabs, setSubTabs] = useState(false);

    const listConvert = useCallback(() => {
        setListData2(intros.intros? intros.intros.map(intro => ({
            link: !intro.subId ? `#${intro.id}` : `#${intro.parentId}_${intro.subId}`,
            title: intro.korTitle,
            isSubTab: !!intro.subId,
            isParent: false
        })) : [
            {
                link: "#1",
                title: "Load",
                isSubTab: false
            }
        ]);
        setListData1(listData2.filter(intro => !intro.isSubTab));
        setTabList(listData);
    }, [intros]);

    useEffect(() => {
        listConvert();
    }, [intros, listConvert]);

    const handleClick = event => {
        const parent = event.target.isParent;
        if (parent) {
            setTabList(listData2);
            setSubTabs(true);
        } else {
            setTabList(listData);
            setSubTabs(false);
        }
    };
    const handleMouseEnter = event => {
        const parent = event.target.isParent;
        if (parent) {
            setTabList(listData2);
        }
    };
    const handleMouseLeave = event => {
        const parent = event.target.isParent;
        if (parent && !subTabs) {
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
                    /* onClick={handleClick.bind(this)}
                    onMouseEnter={handleMouseEnter.bind(this)}
                    onMouseLeave={handleMouseLeave.bind(this)} */
                    href={tab.link}
                    className={
                        !tab.isSubTab ? "introduction-button" : "introduction-sub-button"
                    }
                    subTab={tab.isSubTab}
                    parent={tab.isParent}
                >
                    {tab.title}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};
export default EditableIntroductionList;
