import React, { useState } from "react";

import { ListGroup } from "react-bootstrap";

const EditableIntroductionList = ({ intros }) => {
    /* const listData2 = intros.map(intro => ({
        link: !intro.subId ? `#${intro.id}` : `#${intro.parentId}_${intro.subId}`,
        title: intro.title,
        isSubTab: !!intro.subId
    })) */
    const listData2 = [
        {
          link: "#1",
          title: "총학생회 소개"
        },
        {
          link: "#3_1",
          title: "중앙집행위원회"
        },
        {
          link: "#3_2",
          title: "서기실",
          isSubTab: true
        },
        {
          link: "#3_3",
          title: "집행지원실",
          isSubTab: true
        },
        {
          link: "#3_4",
          title: "정책국",
          isSubTab: true
        },
        {
          link: "#3_5",
          title: "복지국",
          isSubTab: true
        },
        {
          link: "#3_7",
          title: "사무국",
          isSubTab: true
        },
        {
          link: "#3_8",
          title: "디자인국",
          isSubTab: true
        },
        {
          link: "#3_9",
          title: "정보국",
          isSubTab: true
        },
        {
          link: "#4",
          title: "의결기구 소개"
        },
        {
          link: "#5",
          title: "산하기구 소개"
        }
      ];
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
