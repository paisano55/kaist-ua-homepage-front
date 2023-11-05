import React, { useState, useEffect, useCallback } from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ListGroup } from "react-bootstrap";
import { Fragment } from "react";

const EditableIntroductionList = ({ intros }) => {
    const { t } = useTranslation(["Introduction"]);
    const { auth } = useSelector(state => state.auth);
    const [parentList, setParentList] = useState([]);
    const [clicked, setClicked] = useState();

    const ParentTab = ({ parent, children }) => {
        const [collpased, setCollpased] = useState(false);

        const handleClick = (event) => {
            const name = event.target.name;
            setClicked(name);
        };

        if (children.length > 0) {
            return (
                <Fragment>
                    <ListGroup.Item
                        id={parent.link}
                        name={parent.link}
                        action
                        key={parent.link}
                        onClick={
                            handleClick.bind(this)
                        }
                        onMouseEnter={() => setCollpased(true)}
                        onMouseLeave={() => setCollpased(false)}
                        href={
                            parent.link
                            // auth === "admin" ? parent.link : `${parent.link}_1`
                        }
                        className={"introduction-button"}
                    >
                        {t("title", { intro: parent })}
                    </ListGroup.Item>
                    {
                        (collpased || clicked === parent.link || children.find(child => child.link === clicked)) ? children.map(child => (
                            <ListGroup.Item
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
                                {t("title", { intro: child })}
                            </ListGroup.Item>)) : null
                    }
                </Fragment >
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
                    {t("title", { intro: parent })}
                </ListGroup.Item>
            )
        }
    }

    const listConvert = useCallback(() => {
        const parents = [];

        for (let i = 0; i < intros.length; i++) {
            if (intros[i].subIntros.length > 0) {
                intros[i].isParent = true;
                intros[i].childrenList = []
                intros[i].link = `#${intros[i].id}`;
                const subList = intros[i].subIntros;
                for (let j = 0; j < subList.length; j++) {
                    subList[j].isParent = false;
                    subList[j].subId = j + 1;
                    subList[j].childrenList = [];
                    subList[j].link = `#${intros[i].id}_${subList[j].subId}`;
                    intros[i].childrenList.push(subList[j]);
                }
                parents.push(intros[i]);
            } else {
                intros[i].isParent = false;
                intros[i].childrenList = [];
                intros[i].link = `#${intros[i].id}`;
                parents.push(intros[i]);
            }
        }
        setParentList(parents);
    }, [intros]);

    useEffect(() => {
        listConvert();
    }, [intros]);

    return (
        <ListGroup>
            {parentList.map((parent, index) => (
                <ParentTab parent={parent} children={parent.childrenList} key={index} />
            ))}
        </ListGroup>
    );
};
export default EditableIntroductionList;
