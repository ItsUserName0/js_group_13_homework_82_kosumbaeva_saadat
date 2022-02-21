import { createAction, props } from '@ngrx/store';

export const addChar = createAction('[Password] Add char', props<{ char: string }>());
export const removeChar = createAction('[Password] Remove char');
export const enter = createAction('[Password] Enter');
