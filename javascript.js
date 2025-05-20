const myLibrary = [];


function Book(title, author, pages, hasRead) {
    /* avoid using Book constructor without the new */
    if(!new.target) {
        throw Error ("Create using new");
    }

    // the constructor...
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = false;
    
  }
  





function addBookToLibrary(title, author, pages, hasRead) {
// take params, create a book then store it in the array

    const newBook = new Book (title,author,pages,hasRead);
    
    myLibrary.push(newBook);

    

}





addBookToLibrary('Hobbit','Jrr','124',true);
addBookToLibrary('Hobbit2','Jrr','124',true);
addBookToLibrary('Hobbit3','Jrr','124',true);
addBookToLibrary('Hobbit4','Jrr','124',true);

function createBookCard (myLibrary) { 
   

    const bookShelf = document.querySelector("main");

    
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.textContent = book.title;
        bookShelf.appendChild(bookCard);
    })
}

const createButton = document.querySelector("button");

createButton.addEventListener("click", () => createBookCard(myLibrary));