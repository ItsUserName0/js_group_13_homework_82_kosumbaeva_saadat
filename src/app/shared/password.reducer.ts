import { createReducer, on } from '@ngrx/store';
import { addChar, enter, removeChar } from './password.action';

const correctPassword = '1234';

const initialState = {
  password: '',
  isCorrect: false,
};

export const passwordReducer = createReducer(
  initialState,
  on(addChar, (state, {char}) => {
    if (state.password.length >= 4) {
      return state;
    }
    const newPassword = state.password + char;
    const newState = {...state, password: newPassword};
    if (newPassword === correctPassword) {
      newState.isCorrect = true;
    }
    return newState;
  }),
  on(removeChar, state => {
    if (state.password.length === 0) {
      return state;
    }
    const newPassword = state.password.substring(0, state.password.length - 1);
    return {...state, password: newPassword};
  }),
  on(enter, state => {
    if (state.password === correctPassword) {
      return {password: '', isCorrect: true};
    } else {
      return {password: '', isCorrect: false};
    }
  }),
);
