const myLibrary = [];

function Book(id, name, author, page, isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.name = name;
    this.author = author;
    this.page = page;
    this.isRead = isRead;
}

function addBookToLibrary(name, author, page, isRead, myLibrary) {
    const id = crypto.randomUUID();
    const book = new Book(id, name, author, page, isRead);
    myLibrary.push(book);
}