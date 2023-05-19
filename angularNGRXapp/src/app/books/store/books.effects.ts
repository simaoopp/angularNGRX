import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksService } from '../books.service';
import {
  booksFetchAPISucess,
  deleteBookAPISuccess,
  invokeBooksApi,
  invokeDeleteBookAPI,
  invokeSaveBookAPI,
  invokeUpdateBookAPI,
  saveBookAPISuccess,
  updateBookAPISuccess,
} from './books.action';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private bookService: BooksService,
    private appState: Store<Appstate>,
    private store: Store
  ) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksApi),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap(([, booksFromStore]) => {
        if (booksFromStore.length > 0) {
          return EMPTY;
        }
        return this.bookService
          .get()
          .pipe(map((data) => booksFetchAPISucess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveBookAPI),
      switchMap((action) => {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.bookService.create(action.payload).pipe(
          map((data) => {
            this.appState.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveBookAPISuccess({ response: data });
          })
        );
      })
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((action) => {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.bookService.update(action.payload).pipe(
          map((data) => {
            this.appState.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateBookAPISuccess({ response: data });
          })
        );
      })
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleteBookAPI),
      switchMap((action) => {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.bookService.delete(action.id).pipe(
          map((data) => {
            this.appState.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteBookAPISuccess({ id: action.id });
          })
        );
      })
    )
  );
}
