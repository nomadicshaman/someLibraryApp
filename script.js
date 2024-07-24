const myLibrary = [];

function Book(author, title, pageNumber, read) {
  this.author = author;
  this.title = title;
  this.pageNumber = pageNumber;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
  displayBooks(); // Update the table after adding a new book
}

function displayBooks() {
  const tableBody = document.querySelector('#book-table tbody');
  tableBody.innerHTML = ''; // Clear the table before re-displaying

  myLibrary.forEach((book, index) => {
    const row = document.createElement('tr');
    row.setAttribute('data-index', index);

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pageNumber}</td>
      <td>${book.read ? 'Read' : 'Not Read'}</td>
      <td>
        <button class="remove">Remove</button>
        <button class="toggle-read">Toggle Read</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Open the modal dialog to add a new book
document.getElementById('new-book').addEventListener('click', () => {
  document.getElementById('new-book-dialog').showModal();
});

// Close the modal dialog without adding a new book
document.getElementById('cancel').addEventListener('click', () => {
  document.getElementById('new-book-dialog').close();
});

// Handle the form submission to add a new book
document.getElementById('new-book-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value, 10); // Ensure pages are treated as numbers
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);

  document.getElementById('new-book-form').reset();
  document.getElementById('new-book-dialog').close();
});

// Handle the remove and toggle-read buttons
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const index = event.target.parentElement.parentElement.getAttribute('data-index');
    myLibrary.splice(index, 1);
    displayBooks();
  } else if (event.target.classList.contains('toggle-read')) {
    const index = event.target.parentElement.parentElement.getAttribute('data-index');
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
  }
});

// Object to keep track of sorting order for each column
let sortOrder = {
  title: 'asc',
  author: 'asc',
  pageNumber: 'asc', // Updated key name to match the property name in Book
  read: 'asc'
};

// Event listeners for sorting each column
document.getElementById('sort-title').addEventListener('click', () => {
  sortLibrary('title', sortOrder.title);
  sortOrder.title = sortOrder.title === 'asc' ? 'desc' : 'asc';
});

document.getElementById('sort-author').addEventListener('click', () => {
  sortLibrary('author', sortOrder.author);
  sortOrder.author = sortOrder.author === 'asc' ? 'desc' : 'asc';
});

document.getElementById('sort-pages').addEventListener('click', () => {
  sortLibrary('pageNumber', sortOrder.pageNumber);
  sortOrder.pageNumber = sortOrder.pageNumber === 'asc' ? 'desc' : 'asc';
});

document.getElementById('sort-read').addEventListener('click', () => {
  sortLibrary('read', sortOrder.read);
  sortOrder.read = sortOrder.read === 'asc' ? 'desc' : 'asc';
});

// Function to sort the library array based on a property and order
function sortLibrary(property, order) {
  myLibrary.sort((a, b) => {
    if (property === 'pageNumber') {
      // Ensure numerical comparison for page numbers
      return order === 'asc' ? a[property] - b[property] : b[property] - a[property];
    }
    if (a[property] < b[property]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[property] > b[property]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
  displayBooks(); // Update the table after sorting
}

document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('#book-table');
  const headers = table.querySelectorAll('th');
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
    headers.forEach((header, index) => {
      row.children[index].setAttribute('data-label', header.textContent);
    });
  });
});
