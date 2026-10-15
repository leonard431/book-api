const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const bookList = document.getElementById("bookList");
const message = document.getElementById("message");

async function searchBooks() {
    const bookName = searchInput.value.trim();

    if (bookName === "") {
        message.textContent = "Please enter a book title or author.";
        bookList.innerHTML = "";
        return;
    }

    message.textContent = "Searching for books...";
    bookList.innerHTML = "";

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(bookName)}&limit=12`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not get book results.");
        }

        const body = await response.json();

        bookList.innerHTML = "";

        if (body.docs.length === 0) {
            message.textContent = "No books found. Try another search.";
            return;
        }

        message.textContent = `Found ${body.numFound} matching books. Showing up to 12.`;

        body.docs.forEach((book) => {
            const card = document.createElement("article");
            card.className = "book-card";

            const image = document.createElement("img");

            if (book.cover_i) {
                image.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                image.alt = `Cover of ${book.title}`;
            } else {
                image.alt = "No book cover available";
                image.style.display = "none";
            }

            const title = document.createElement("h2");
            title.textContent = book.title || "Untitled";

            const author = document.createElement("p");
            author.textContent = `Author: ${
                book.author_name
                    ? book.author_name.join(", ")
                    : "Unknown"
            }`;

            const year = document.createElement("p");
            year.textContent = `First published: ${
                book.first_publish_year || "Unknown"
            }`;

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(year);

            bookList.appendChild(card);
        });

    } catch (error) {
        message.textContent =
            "Something went wrong. Please check your connection and try again.";

        console.error(error);
    }
}

searchButton.addEventListener("click", searchBooks);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBooks();
    }
});