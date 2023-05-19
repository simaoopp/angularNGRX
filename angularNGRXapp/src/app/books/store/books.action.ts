import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const invokeBooksApi = createAction(
    "[Books API] invoke books Fetch API"
)

export const booksFetchAPISucess = createAction(
    "[Books API] invoke books Fetch API Sucess",
    props<{allBooks:Book[]}>()
    
)