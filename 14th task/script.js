 let books = JSON.parse(localStorage.getItem("libraryBooks")) || [
    {
        name: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780061122415-M.jpg"
    },
    {
        name: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg"
    },
    {
        name: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780553380163-M.jpg"
    },
    {
        name: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg"
    },
    {
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg"
    },
    {
        name: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fiction",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780547928227-M.jpg"
    },
    {
        name: "Sapiens",
        author: "Yuval Noah Harari",
        category: "History",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
    },
    {
        name: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Self Help",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9781612680194-M.jpg"
    },
    {
        name: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Self Help",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780857197689-M.jpg"
    },
    {
        name: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        category: "Technology",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg"
    },
    {
        name: "The Diary of a Young Girl",
        author: "Anne Frank",
        category: "History",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780553296983-M.jpg"
    },
    {
        name: "The Origin of Species",
        author: "Charles Darwin",
        category: "Science",
        available: true,
        image: "https://covers.openlibrary.org/b/isbn/9780451529060-M.jpg"
    }
];

const bookList = document.getElementById("bookList");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const addBookSection = document.getElementById("addBookSection");

function saveBooks() {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
}

function displayBooks() {
    let searchText = searchBox.value.toLowerCase();
    let selectedCategory = categoryFilter.value;

    let filteredBooks = books.filter(function(book) {

        let matchesSearch =
            book.name.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        let matchesCategory =
            selectedCategory === "all" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    bookList.innerHTML = "";

    if (filteredBooks.length === 0) {
        bookList.innerHTML = `
            <div class="no-books">
                <h3>No books found</h3>
                <p>Try another search or category.</p>
            </div>
        `;
        updateStats();
        return;
    }

    filteredBooks.forEach(function(book) {

        let index = books.indexOf(book);

        let card = document.createElement("div");
        card.className = "book";

        card.innerHTML = `
            <img
                src="${book.image}"
                alt="${book.name}"
                class="book-image"
            >

            <div class="book-info">

                <h3>${book.name}</h3>

                <p class="author">
                    By ${book.author}
                </p>

                <span class="category">
                    ${book.category}
                </span>

                <p class="status ${book.available ? "available" : "borrowed"}">
                    ${book.available ? "● Available" : "● Borrowed"}
                </p>

                <div class="book-buttons">

                    <button onclick="changeStatus(${index})">
                        ${book.available ? "Borrow" : "Return"}
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteBook(${index})"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;

        bookList.appendChild(card);
    });

    updateStats();
}

function updateStats() {

    let total = books.length;

    let available = books.filter(function(book) {
        return book.available;
    }).length;

    let borrowed = books.filter(function(book) {
        return !book.available;
    }).length;

    document.getElementById("totalBooks").textContent = total;
    document.getElementById("availableBooks").textContent = available;
    document.getElementById("borrowedBooks").textContent = borrowed;

    document.getElementById("bookCount").textContent =
        total + (total === 1 ? " book" : " books");
}

function changeStatus(index) {

    books[index].available = !books[index].available;

    saveBooks();
    displayBooks();
}

function deleteBook(index) {

    let answer = confirm(
        "Are you sure you want to delete this book?"
    );

    if (answer) {
        books.splice(index, 1);

        saveBooks();
        displayBooks();
    }
}

function addBook() {

    let name = document.getElementById("bookName").value.trim();
    let author = document.getElementById("authorName").value.trim();
    let category = document.getElementById("bookCategory").value;
    let image = document.getElementById("bookImage").value.trim();

    if (name === "" || author === "") {
        alert("Please enter the book name and author.");
        return;
    }

    if (image === "") {
        image = "https://covers.openlibrary.org/b/id/8231856-M.jpg";
    }

    let newBook = {
        name: name,
        author: author,
        category: category,
        available: true,
        image: image
    };

    books.push(newBook);

    saveBooks();
    displayBooks();

    document.getElementById("bookName").value = "";
    document.getElementById("authorName").value = "";
    document.getElementById("bookImage").value = "";

    addBookSection.style.display = "none";
}

document.getElementById("showAddBook").addEventListener("click", function() {

    if (addBookSection.style.display === "block") {
        addBookSection.style.display = "none";
    } else {
        addBookSection.style.display = "block";
    }

});

document.getElementById("addBookButton").addEventListener("click", addBook);

searchBox.addEventListener("input", displayBooks);

categoryFilter.addEventListener("change", displayBooks);

displayBooks();