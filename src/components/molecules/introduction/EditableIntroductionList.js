import React, { useState, useEffect, useCallback } from "react";

import { ListGroup } from "react-bootstrap";

const EditableIntroductionList = (intros) => {
    const [listData2, setListData2] = useState([]);
    const [listData, setListData1] = useState([]);
    const [tabList, setTabList] = useState([]);
    const [subTabs, setSubTabs] = useState(true);

    const listConvert = useCallback(() => {
        const introList = [];
        for (let i = 0; i < intros.intros.length; i++) {
            if (!intros.intros[i].parentId) {
                if (intros.intros.filter(intro => intro.parentId === intros.intros[i].id).length > 0) {
                    intros.intros[i].isParent = true;
                    introList.push(intros.intros[i]);
                    const subList = intros.intros.filter(intro => intro.parentId === intros.intros[i].id);
                    for (let j = 0; j < subList.length; j++) {
                        subList[j].isParent = false;
                        subList[j].subId = j + 1;
                        introList.push(subList[j]);
                    }
                } else {
                    intros.intros[i].isParent = false;
                    introList.push(intros.intros[i]);
                }
            }
        }
        setListData2(introList.map(intro => ({
            link: !intro.subId ? `#${intro.id}` : `#${intro.parentId}_${intro.subId}`,
            title: intro.korTitle,
            isSubTab: !!intro.parentId
        })));
        setListData1(introList.filter(intro => !intro.parentId).map(intro => ({
            link: !intro.subId ? `#${intro.id}` : `#${intro.parentId}_${intro.subId}`,
            title: intro.korTitle,
            isSubTab: !!intro.parentId
        })));
        setTabList(listData2);
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
                    onClick={handleClick.bind(this)}
                    onMouseEnter={handleMouseEnter.bind(this)}
                    onMouseLeave={handleMouseLeave.bind(this)}
                    href={tab.link}
                    className={
                        !tab.isSubTab ? "introduction-button" : "introduction-sub-button"
                    }
                >
                    {tab.title}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};
export default EditableIntroductionList;
