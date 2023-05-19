import { createReducer, on } from '@ngrx/store';
import { Book } from './book';
import { booksFetchAPISucess } from './books.action';

export const InitialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  InitialState,
  on(booksFetchAPISucess, (state, { allBooks }) => {
    return allBooks;
  })
);
