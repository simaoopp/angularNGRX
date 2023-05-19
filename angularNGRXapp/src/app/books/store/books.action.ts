import { createAction, props } from '@ngrx/store';
import { Book } from './book';

export const invokeBooksApi = createAction(
  '[Books API] invoke books Fetch API'
);

export const booksFetchAPISucess = createAction(
  '[Books API] invoke books Fetch API Sucess',
  props<{ allBooks: Book[] }>()
);

export const invokeSaveBookAPI = createAction(
  '[Books API] invoke save books API',
  props<{ payload: Book }>()
);

export const saveBookAPISuccess = createAction(
  '[Books API] invoke save books API Sucess',
  props<{ response: Book }>()
);

export const invokeUpdateBookAPI = createAction(
  '[Books API] invoke update books API',
  props<{ payload: Book }>()
);

export const updateBookAPISuccess = createAction(
  '[Books API] invoke update books API Sucess',
  props<{ response: Book }>()
);
