import { createActions, handleActions } from "redux-actions";

const { init, setIntro, changeField } = createActions({
    INIT: () => { },
    // intro: {id, parentId, subId, korTitle, engTitle, korContent, engContent}
    SET_INTRO: intro => intro,
    CHANGE_FIELD: ({ key, value }) => ({
        key,
        value
    })
});

export { init, setIntro, changeField };

const initialState = {
    korTitle: "",
    engTitle: "",
    korContent: "",
    engContent: ""
};

const intro = handleActions(
    {
        [init]: () => initialState,
        [setIntro]: (state, { payload: intro }) => ({ ...state, ...intro }),
        [changeField]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value
        })
    },
    initialState
);

export default intro;
