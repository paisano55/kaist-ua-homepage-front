import React, { useState, useEffect, useCallback } from "react";

import { ListGroup } from "react-bootstrap";

const EditableIntroductionList = (intros) => {
    const [parentList, setParentList] = useState([]);
    const [clicked, setClicked] = useState();

    const ParentTab = ({ parent, children }) => {
        const [collpased, setCollpased] = useState(false);

        const handleClick = event => {
            const name = event.target.name;
            setClicked(name);
        };

        if (children.length > 0) {
            return (
                <>
                    <ListGroup.Item
                        id={parent.link}
                        name={parent.link}
                        action
                        key={parent.link}
                        onClick={handleClick.bind(this)}
                        onMouseEnter={() => setCollpased(true)}
                        onMouseLeave={() => setCollpased(false)}
                        href={parent.link}
                        className={"introduction-button"}
                    >
                        {parent.korTitle}
                    </ListGroup.Item>
                    {(collpased || clicked === parent.link || children.find(child => child.link == clicked)) ? children.map(child => (<ListGroup.Item
                        id={child.link}
                        name={child.link}
                        action
                        key={child.link}
                        onClick={handleClick.bind(this)}
                        onMouseEnter={() => setCollpased(true)}
                        onMouseLeave={() => setCollpased(false)}
                        href={child.link}
                        className={"introduction-sub-button"}
                    >
                        {child.korTitle}
                    </ListGroup.Item>)) : null}
                </>
            )
        } else {
            return (
                <ListGroup.Item
                    id={parent.link}
                    name={parent.link}
                    action
                    key={parent.link}
                    onClick={handleClick.bind(this)}
                    href={parent.link}
                    className={"introduction-button"}
                >
                    {parent.korTitle}
                </ListGroup.Item>
            )
        }
    }

    const listConvert = useCallback(() => {
        const parents = [];

        for (let i = 0; i < intros.intros.length; i++) {
            if (!intros.intros[i].parentId) {
                if (intros.intros.filter(intro => intro.parentId === intros.intros[i].id).length > 0) {
                    intros.intros[i].isParent = true;
                    intros.intros[i].childrenList = []
                    intros.intros[i].link = `#${intros.intros[i].id}`;
                    const subList = intros.intros.filter(intro => intro.parentId === intros.intros[i].id);
                    for (let j = 0; j < subList.length; j++) {
                        subList[j].isParent = false;
                        subList[j].subId = j + 1;
                        subList[j].childrenList = [];
                        subList[j].link = `#${intros.intros[i].id}_${subList[j].subId}`;
                        intros.intros[i].childrenList.push(subList[j]);
                    }
                    parents.push(intros.intros[i]);
                } else {
                    intros.intros[i].isParent = false;
                    intros.intros[i].childrenList = [];
                    intros.intros[i].link = `#${intros.intros[i].id}`;
                    parents.push(intros.intros[i]);
                }
            }
        }
        setParentList(parents);
    }, [intros]);

    useEffect(() => {
        listConvert();
    }, [intros, listConvert]);

    return (
        <ListGroup>
            {parentList.map((parent, index) => (
                <ParentTab parent={parent} children={parent.childrenList} key={index} />
            ))}
        </ListGroup>
    );
};
export default EditableIntroductionList;
