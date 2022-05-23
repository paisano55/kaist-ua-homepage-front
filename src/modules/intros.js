import { createAction, handleActions } from "redux-actions";

const LIST_INTROS = "intros/LIST_INTROS";

export const listIntros = createAction(LIST_INTROS);

const initialState = {
    intros: null
};

const intros = handleActions(
    {
        [LIST_INTROS]: (state, { payload: { intros } }) => ({
            ...state,
            intros
        }),
    },
    initialState
);

export default intros;
