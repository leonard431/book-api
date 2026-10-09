const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const bookList = document.getElementById("bookList");

async function searchBooks() {
    const searchTerm = searchInput.value;

    const url = `https://openlibrary.org/search.json?q=${searchTerm}`;

    const response = await fetch(url);

    const body = await response.json();

    console.log(body.docs);
}

searchButton.addEventListener("click", searchBooks);