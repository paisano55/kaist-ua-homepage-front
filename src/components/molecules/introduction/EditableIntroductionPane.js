import React from "react";

import { default as Intro1 } from "./Intro1";
import { default as Intro2 } from "./Intro2";
import * as Intro3 from "./Intro3";
import { default as Intro4 } from "./Intro4";
import { default as Intro5 } from "./Intro5";

import { Tab } from "react-bootstrap";

const EditableIntroductionPane = () => {
    return (
        <Tab.Content>
            <Tab.Pane eventKey="#1">
                <Intro1 />
            </Tab.Pane>
            <Tab.Pane eventKey="#2">
                <Intro2 />
            </Tab.Pane>
            <Tab.Pane eventKey="#3_1">
                <Intro3.Intro1 />
            </Tab.Pane>
            <Tab.Pane eventKey="#3_2">
                <Intro3.Intro2 />
            </Tab.Pane>
            <Tab.Pane eventKey="#3_3">
                <Intro3.Intro3 />
            </Tab.Pane>
            <Tab.Pane eventKey="#3_4">
                <Intro3.Intro4 />
            </Tab.Pane>
            <Tab.Pane eventKey="#3_5">
                <Intro3.Intro5 />
            </Tab.Pane>
            <Tab.Pane eventKey="#3_6">
                <Intro3.Intro6 />
            </Tab.Pane>
            <Tab.Pane eventKey="#3_7">
                <Intro3.Intro7 />
            </Tab.Pane>
            <Tab.Pane eventKey="#3_8">
                <Intro3.Intro8 />
            </Tab.Pane>
            <Tab.Pane eventKey="#3_9">
                <Intro3.Intro9 />
            </Tab.Pane>
            <Tab.Pane eventKey="#4">
                <Intro4 />
            </Tab.Pane>
            <Tab.Pane eventKey="#5">
                <Intro5 />
            </Tab.Pane>
        </Tab.Content>
    );
};
export default EditableIntroductionPane;
