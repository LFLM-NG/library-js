const myLibrary = [
    {
        id: `1234567890`,
        title: `Book 1`,
        author: `John Doe`,
        isRead: false,
    },
    {
        id: `0987654321`,
        title: `Book 2`,
        author: `John Doe`,
        isRead: false,
    },
];

function Book(id, title, author, isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, isRead) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, isRead);
    myLibrary.push(book);
}

function addBookToDisplay(book) {
    const display = document.querySelector(`#book-list`);
    const row = document.createElement(`tr`);
    // const style = 
    
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.id}</td>
    <td>${(book.isRead) ? 'Yes' : 'No'}</td>
    <td><button type="button" class="button-read">Read</button><button type="button" class="button-delete">Remove</button></td>
    `;

    display.appendChild(row);
}

myLibrary.forEach((book) => addBookToDisplay(book));
