const addBookBtn = document.querySelector(".add-book");
const formContainer = document.querySelector(".form");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const isReadInput = document.querySelector("#isRead");

let myLibrary = [];

addBookBtn.addEventListener("click", (e) => {
  formContainer.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const obj = {
    title: titleInput.value,
    author: authorInput.value,
    pages: pagesInput.value,
    isRead: isReadInput.checked,
  };

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  isReadInput.checked = false;
  formContainer.classList.add("hidden");

  addBookToLibrary(obj);
});

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary({ title, author, pages, isRead }) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);

  displayBooks();
}

function removeBookFromLibrary(bookTitle) {
  myLibrary = myLibrary.filter((book) => bookTitle !== book.title);

  displayBooks();
}

function changeReadStatus(bookTitle) {
  myLibrary = myLibrary.map((book) => {
    if (bookTitle === book.title) {
      book.isRead = !book.isRead;
      return book;
    }

    return book;
  });
  displayBooks();
}

function displayBooks() {
  const books = document.querySelector(".books");
  if (books) books.remove();

  const booksContainer = document.createElement("div");
  booksContainer.classList.add("books");
  document.body.insertAdjacentElement("beforeend", booksContainer);

  for (let value of myLibrary) {
    const book = document.createElement("div");
    book.setAttribute("data-title", value.title);
    book.classList.add("book");

    book.innerHTML = `
        <p>${value.title}</p>
        <p>Author: ${value.author}</p>
        <p>Pages: ${value.pages}</p>
        <p>${
          value.isRead ? "The book is read" : "The book has not been read yet"
        }</p>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "delete");
    deleteButton.textContent = "Delete";
    book.insertAdjacentElement("beforeend", deleteButton);

    deleteButton.addEventListener("click", (e) => {
      const title = e.target.parentElement.getAttribute("data-title");

      removeBookFromLibrary(title);
    });

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("btn", "toggle");
    toggleButton.textContent = "Update status";
    book.insertAdjacentElement("beforeend", toggleButton);

    toggleButton.addEventListener("click", (e) => {
      const title = e.target.parentElement.getAttribute("data-title");

      changeReadStatus(title);
    });

    booksContainer.insertAdjacentElement("beforeend", book);
  }
}

displayBooks(myLibrary);
