// Array for Book objects
const myLibrary = [];

// Book Constructor
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

// Add Book to array
function addBookToLibrary(title, author, isRead) {
    // Generate ID for Book Object
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, isRead);
    myLibrary.push(book);
    return book;
}

// Placeholder Book Objects
const book1 = addBookToLibrary(`Book 1`, `John Doe`, false);
const book2 = addBookToLibrary(`Book 2`, `John Doe`, true);

// Display Book in Table Format
function addBookToDisplay(book) {
    const display = document.querySelector(`#book-list`);
    // DOM row associated with Book ID
    const row = document.createElement(`tr`);
    row.dataset.id = book.id;

    // Dynamic table cells with Book data
    const values = [book.title, book.author]
    values.forEach(value => {
        const td = document.createElement(`td`);
        td.textContent = value;
        row.appendChild(td);
    });

    // Cell with class for Book isRead status
    const tdIsRead = document.createElement(`td`);
    tdIsRead.classList.add(`cell-read`);
    tdIsRead.textContent = (book.isRead) ? `Yes` : `No`;
    row.append(tdIsRead);

    // Cell with buttons
    const tdButton = document.createElement(`td`);
    tdButton.classList.add(`cell-button`)
    const buttonRead = createButton(`button-read`, `Read / Unread`, book.id);
    const buttonDelete = createButton(`button-delete`, `Remove`, book.id);
    tdButton.appendChild(buttonRead);
    tdButton.appendChild(buttonDelete);
    row.append(tdButton);

    display.appendChild(row);
}

// Buttons associated with Book ID
function createButton(buttonClass, buttonText, id) {
    const buttonElement = document.createElement(`button`);
    buttonElement.classList.add(buttonClass);
    buttonElement.dataset.id = id;
    buttonElement.textContent = buttonText;
    return buttonElement;
}

// Set Form to Empty
function clearForm() {
    document.querySelector(`#title`).value = ``;
    document.querySelector(`#author`).value = ``;
    document.querySelector(`#read-status`).checked = false;
}

function buttonAction(button) {
    const id = button.dataset.id;
    // Find Row with matching ID
    const row = document.querySelector(`tr[data-id="${id}"]`)
    // Remove Row
    if (button.classList.contains(`button-delete`)) {
        row.remove();
        // Show Remove Message
        showAlert(`remove`, `Book Removed`);
    }
    // Toggle cell with Book isRead status
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

function showAlert(alertClass, alertText) {
    const div = document.createElement(`div`);
    div.classList.add(`alert`, alertClass);
    div.textContent = alertText;
    const container = document.querySelector(`.library-container`);
    const form = document.querySelector(`#book-form`);
    container.insertBefore(div, form);

    // Disappear after 1000ms
    setTimeout(() => document.querySelector(`.alert`).remove(), 1000);
}


function displayBooks() {
    myLibrary.forEach((book) => addBookToDisplay(book));
}

// Event: Display books in library array
// Useful for preexisting array OR persistent storage
document.addEventListener(`DOMContentLoaded`, displayBooks);

// Event: Add Book from Form Submission
document.querySelector(`#book-form`).addEventListener(`submit`, (e) => {

    // Prevent default server submission
    e.preventDefault();

    // Get form values
    const title = document.querySelector(`#title`).value;
    const author = document.querySelector(`#author`).value;
    const isRead = document.querySelector(`#read-status`).checked;

    // Create Book Object
    const book = addBookToLibrary(title, author, isRead);
    // Display Book as Table Row
    addBookToDisplay(book);
    // Show Success Message
    showAlert(`success`, `Book Added`);

    // Clear Fields
    clearForm();
});

// Event: Remove book OR Toggle Read/Unread Status
document.querySelector(`#book-list`).addEventListener(`click`, (e) => {
    buttonAction(e.target);
});