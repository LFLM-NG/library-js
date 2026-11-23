const myLibrary = [
    {
        title: `Book 1`,
        author: `John Doe`,
        id: `1234567890`,
        isRead: false,
    },
    {
        title: `Book 2`,
        author: `John Doe`,
        id: `0987654321`,
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

function createButton(buttonClass, buttonText) {
    const buttonElement = document.createElement(`button`);
    buttonElement.classList.add(buttonClass);
    buttonElement.textContent = buttonText;
    return buttonElement;
}

function addBookToDisplay(book) {
    const display = document.querySelector(`#book-list`);
    const row = document.createElement(`tr`);
    Object.values(book).forEach(value => {
        const td = document.createElement(`td`);
        if (typeof value === `boolean`) { td.textContent = (value) ? `Yes` : `No` }
        else { td.textContent = value; }
        row.appendChild(td);
    });
    const tdButton = document.createElement(`td`);
    const buttonRead = createButton(`button-read`, `Read`);
    const buttonDelete = createButton(`button-delete`, `Remove`);
    tdButton.appendChild(buttonRead);
    tdButton.appendChild(buttonDelete);
    row.append(tdButton);
    display.appendChild(row);
}

myLibrary.forEach((book) => addBookToDisplay(book));
