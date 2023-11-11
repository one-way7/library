const addBookBtn = document.querySelector(".add-book");
const formContainer = document.querySelector(".form");
const form = document.querySelector("form");

let myLibrary = [];

addBookBtn.addEventListener("click", (e) => {
  formContainer.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formContainer.classList.add("hidden");
  addBookToLibrary();
  form.reset();
});

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;

  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);

  render();
}

function removeBookFromLibrary(bookTitle) {
  myLibrary = myLibrary.filter((book) => bookTitle !== book.title);

  render();
}

function changeReadStatus(bookTitle) {
  myLibrary = myLibrary.map((book) => {
    if (bookTitle === book.title) {
      book.isRead = !book.isRead;
      return book;
    }

    return book;
  });
  render();
}

function render() {
  const booksLibrary = document.querySelector(".books-library");
  booksLibrary.innerHTML = "";

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

    booksLibrary.insertAdjacentElement("beforeend", book);
  }
}

render(myLibrary);
