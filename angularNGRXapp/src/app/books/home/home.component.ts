import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { invokeBooksApi, invokeDeleteBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';

declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  appState: any;
  constructor(private store: Store, private appStates: Store<Appstate>) {}

  books$ = this.store.pipe(select(selectBooks));
  deleteModal: any;
  idtoDelete: number = 0;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.store.dispatch(invokeBooksApi());
  }

  openDeleteModal(id: number) {
    this.idtoDelete = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    this.store.dispatch(invokeDeleteBookAPI({ id: this.idtoDelete }));

    let appstate$ = this.appStates.pipe(select(selectAppState));
    appstate$.subscribe((data) => {
      if (data.apiStatus === 'sucess') {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
      }
    });
    this.deleteModal.hide();
  }
}
