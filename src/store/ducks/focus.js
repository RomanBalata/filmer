import { createAction, handleActions } from 'redux-actions';
import { SET_FOCUS, SET_KEY } from 'store/types';

// Action creators
export const setFocus = createAction(SET_FOCUS);
export const setKey = createAction(SET_KEY);

// Reducer

const defaultState = {
  focusedScreen: 'menu',
  pressedKey: null,
};

export default handleActions(
  {
    [setFocus]: (state, action) => ({
      ...state,
      focusedScreen: action.payload,
    }),
    [setKey]: (state, action) => ({
      ...state,
      pressedKey: action.payload,
    }),
  },
  defaultState,
);
