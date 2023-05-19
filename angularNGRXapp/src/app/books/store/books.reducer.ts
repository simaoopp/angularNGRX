import { createReducer, on } from '@ngrx/store';
import { Book } from './book';
import { booksFetchAPISucess, saveBookAPISuccess, updateBookAPISuccess } from './books.action';

export const InitialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  InitialState,
  on(booksFetchAPISucess, (state, { allBooks }) => {
    return allBooks;
  }),
  on(saveBookAPISuccess, (state, { response }) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
  on(updateBookAPISuccess, (state, {response }) => {
    let newState = state.filter(_ => _.id !== response.id);
    newState.unshift(response);
    return newState;
  })
);
