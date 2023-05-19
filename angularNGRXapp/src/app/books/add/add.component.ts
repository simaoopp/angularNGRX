import { Component } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { invokeSaveBookAPI } from '../store/books.action';
import { Router } from '@angular/router';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(
    private store: Store,
    private router: Router,
    private appState: Store<Appstate>
  ) {}

  bookForm: Book = {
    id: 0,
    author: '',
    title: '',
    cost: 0,
  };

  save() {
    this.store.dispatch(invokeSaveBookAPI({ payload: { ...this.bookForm } }));
    let appstate$ = this.appState.pipe(select(selectAppState));
    appstate$.subscribe((data) => {
      if (data.apiStatus === 'sucess') {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        this.router.navigateByUrl('');
      }
    });
  }
}
