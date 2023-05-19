import { createReducer, on } from '@ngrx/store';
import { Book } from './book';
import { booksFetchAPISucess, saveBookAPISucess } from './books.action';

export const InitialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  InitialState,
  on(booksFetchAPISucess, (state, { allBooks }) => {
    return allBooks;
  }),
  on(saveBookAPISucess, (state, { response }) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  })
);
