export interface Book {
        "id": number,
        "title": string,
        "author": string,
        "cost": number,
        "img": string
}

export interface BookState {
        books:Book[]
}