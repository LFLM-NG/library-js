const myLibrary = [];

function Book(id, title, author, isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

Book.prototype.changeIsRead = function() {
    this.isRead = !this.isRead;
} 

function addBookToLibrary(title, author, isRead) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, isRead);
    myLibrary.push(book);
    return book;
}

const book1 = addBookToLibrary(`Book 1`, `John Doe`, false);
const book2 = addBookToLibrary(`Book 2`, `John Doe`, true);

function createButton(buttonClass, buttonText, id) {
    const buttonElement = document.createElement(`button`);
    buttonElement.classList.add(buttonClass);
    buttonElement.dataset.id = id;
    buttonElement.textContent = buttonText;
    return buttonElement;
}

function addBookToDisplay(book) {
    const display = document.querySelector(`#book-list`);
    const row = document.createElement(`tr`);
    row.dataset.id = book.id;

    const values = [book.title, book.author]
    values.forEach(value => {
        const td = document.createElement(`td`);
        td.textContent = value;
        row.appendChild(td);
    });

    const tdIsRead = document.createElement(`td`);
    tdIsRead.classList.add(`cell-read`);
    tdIsRead.textContent = (book.isRead) ? `Yes` : `No`;
    row.append(tdIsRead);

    const tdButton = document.createElement(`td`);
    tdButton.classList.add(`cell-button`)
    const buttonRead = createButton(`button-read`, `Read / Unread`, book.id);
    const buttonDelete = createButton(`button-delete`, `Remove`, book.id);
    tdButton.appendChild(buttonRead);
    tdButton.appendChild(buttonDelete);
    row.append(tdButton);
    display.appendChild(row);
}

function displayBooks() {
    myLibrary.forEach((book) => addBookToDisplay(book));
}

function clearForm() {
    document.querySelector(`#title`).value = ``;
    document.querySelector(`#author`).value = ``;
    document.querySelector(`#read-status`).checked = false;
}

function buttonAction(button) {
    const id = button.dataset.id;
    const row = document.querySelector(`tr[data-id="${id}"]`)
    if (button.classList.contains(`button-delete`)) {
        row.remove();
    }
    else if (button.classList.contains(`button-read`)) {
        for (const book of myLibrary) {
            if (book.id === id) {
                book.changeIsRead();
                const td = row.querySelector(`.cell-read`);
                td.textContent = (book.isRead) ? `Yes` : `No`;
            }
        }
    }
};

document.addEventListener(`DOMContentLoaded`, displayBooks);

document.querySelector(`#book-form`).addEventListener(`submit`, (e) => {

    e.preventDefault();

    const title = document.querySelector(`#title`).value;
    const author = document.querySelector(`#author`).value;
    const isRead = document.querySelector(`#read-status`).checked;

    const book = addBookToLibrary(title, author, isRead);
    addBookToDisplay(book);

    clearForm();
});

document.querySelector(`#book-list`).addEventListener(`click`, (e) => {
    buttonAction(e.target);
});