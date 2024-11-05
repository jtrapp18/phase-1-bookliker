document.addEventListener("DOMContentLoaded", function() {
    getJSON("http://localhost:3000/books")
    .then(books => books.forEach(book => {

        const li = document.createElement('li')
        li.textContent = book.title
        li.addEventListener("click", () => renderBook(book))

        document.querySelector("ul#list").append(li)
    }))
});

function renderUsers(book, bookUsers) {
    bookUsers.innerHTML = ""
    book.users.forEach(user => {
        const addUser = document.createElement('li')
        addUser.textContent = user.username

        bookUsers.append(addUser)
    })
}

function renderBook(book) {
    document.querySelector("#show-panel").innerHTML = ""

    const bookId = document.createElement('p')
    bookId.textContent = book.id

    const bookTitle = document.createElement('h1')
    bookTitle.textContent = book.title

    const bookSubtitle = document.createElement('h2')
    bookSubtitle.textContent = book.subtitle

    const bookDescr = document.createElement('p')
    bookDescr.textContent = book.description

    const bookAuthor = document.createElement('p')
    bookAuthor.textContent = `By ${book.author}`

    const bookImg = document.createElement('img')
    bookImg.src = book.img_url

    const likeLabel = document.createElement('p')
    likeLabel.textContent = "Liked By:"

    const bookUsers = document.createElement('ul')
    renderUsers(book, bookUsers)

    const likeBtn = document.createElement('button')
    likeBtn.textContent = "LIKE"
    likeBtn.addEventListener("click", (event) => likeHandler(event, book, bookUsers));
    
    document.querySelector("#show-panel").append(bookId, bookTitle, bookSubtitle, bookDescr, bookAuthor, bookImg, likeLabel, bookUsers, likeBtn)
}

function getJSON(url) {
    return fetch(url).then(res => res.json())
}

function likeHandler(event, book, bookUsers) {
    console.log(event)
    const bookRev = { ...book }

        if (event.target.textContent === "LIKE") {
            const newUser = {"id": 18, "username": "jtrapp"}
            bookRev.users.push(newUser)
            
            event.target.textContent = "UNLIKE"
        }
        else {
            const userIndex = bookRev.users.findIndex(user => user.username === "jtrapp")
            bookRev.users.splice(userIndex, 1)

            event.target.textContent = "LIKE"
        }
        updateLikes(bookRev)
        renderUsers(bookRev, bookUsers)
    }

function updateLikes(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(res => res.json())
    .then(book => console.log(book))
}
