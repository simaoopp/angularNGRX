import { Component } from '@angular/core';
import { Book } from '../store/book';
import { Store } from '@ngrx/store';
import { invokeSaveBookAPI } from '../store/books.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(private store: Store, private router: Router) {}

  bookForm: Book = {
    id: 0,
    author: '',
    title: '',
    cost: 0,
  };

  save() {
    this.store.dispatch(invokeSaveBookAPI({payload: {...this.bookForm}}));
    this.router.navigateByUrl("");
  }
}
