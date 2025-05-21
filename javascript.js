const myLibrary = [];


/* creates the form when the add book button is clicked */
const createButton = document.querySelector("button");
createButton.addEventListener("click", createBookForm);


/* wait for the data to load */
document.addEventListener("DOMContentLoaded", () => {
    createBookCard(myLibrary);
})

/* sample data */
addBookToLibrary('The Hobbit','Tolkien','124',"yes");
addBookToLibrary('LOTR: Two towers','Tolkien','320',"no");
addBookToLibrary('LOTR: Return of the king','Tolkien','421',"yes");
addBookToLibrary('LOTR: Fellowship','Tolkien','514',"no");






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
    this.hasRead = hasRead;
    
  }
  

function addBookToLibrary(title, author, pages, hasRead) {
// take params, create a book then store it in the array

    const newBook = new Book (title,author,pages,hasRead);

    myLibrary.push(newBook);

}


function createBookCard (myLibrary) { 
   
    const bookShelf = document.querySelector("#library tbody");
    
    myLibrary.forEach(book => {

        const bookCard = document.createElement("tr");

        Object.keys(book).forEach(key => {
            // Create a new table data cell for the current property
            const td = document.createElement("td");


            /* add if key = hasRead? to create select input */

            if (key === "hasRead") {

                const selector = document.createElement("select");
                selector.setAttribute("name", "hasRead");

                const yesOption = document.createElement("option");
                yesOption.setAttribute("value", "yes");
                yesOption.innerText = "yes";
                selector.appendChild(yesOption);

                const noOption = document.createElement("option");
                noOption.setAttribute("value", "no");
                noOption.innerText = "no";
                selector.appendChild(noOption);

                // changes the corresponding input to true
                if (book[key] === "yes") {
                    yesOption.selected = true;
                } else {
                    noOption.selected = true;
                }

                // if you change the hasRead in the table so it updates
                selector.addEventListener("change", () => {
                    book.hasRead = selector.value;
                });

                td.appendChild(selector);

            }  else {

                // Get the value of the property from the book object
                let value = book[key];

                td.innerText = value;

            }

            // Append the table data cell to the book's row
            bookCard.appendChild(td);
        });



        /* add delete button? */

        // you need to create a cell so it can center properly
        const deleteCell = document.createElement("td");
        // create the button itself
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerText = "X";
        deleteButton.addEventListener("click", () => {

        // Eliminar el libro del array usando su ID
        const index = myLibrary.findIndex(b => b.id === book.id);
        myLibrary.splice(index, 1); // removes from the array
    

        bookCard.remove();
        })

        // Agregar el botón a la celda y la celda a la fila
        deleteCell.appendChild(deleteButton);
        bookCard.appendChild(deleteCell);


        // Append the completed book row to the table body
        bookShelf.appendChild(bookCard);
        
    })
}


function createBookForm () {

   // avoid more than one form
    if (document.querySelector(".bookFormContainer")) {
        return; // does nothing
    }

    const bookFormCategories = ["title", "author", "pages"];
    const mainElement = document.querySelector("main");
    /* Creates the bookForm Container */
    const bookFormContainer = document.createElement("div");
    bookFormContainer.classList.add("bookFormContainer");
    mainElement.appendChild(bookFormContainer);

    /* Create labels and input fields for every category needed */
    bookFormCategories.forEach(category => {
        const categoryLabel = document.createElement("label");
        categoryLabel.setAttribute("for", "book_"+`${category}`);
        categoryLabel.innerText = ("Book "+`${category}`+": ");
        bookFormContainer.appendChild(categoryLabel);

        const categoryInput = document.createElement("input");
        categoryInput.setAttribute("type", "text");
        categoryInput.setAttribute("id", "book_"+`${category}`);
        categoryInput.setAttribute("name", "book"+`${category}`); 

        
        bookFormContainer.appendChild(categoryInput);
    });

    /* The has read label and option creation */
    const hasReadLabel = document.createElement("label");
    hasReadLabel.innerText = ("Have you read it?");
    bookFormContainer.appendChild(hasReadLabel);

    const hasReadSelect = document.createElement("select");
    hasReadSelect.setAttribute("name", "hasRead");

    const hasReadOptionTrue = document.createElement("option");
    hasReadOptionTrue.setAttribute("value", "yes");
    hasReadOptionTrue.innerText = "Yes";
    hasReadSelect.appendChild(hasReadOptionTrue);


    const hasReadOptionFalse = document.createElement("option");
    hasReadOptionFalse.setAttribute("value", "no");
    hasReadOptionFalse.innerText = "No"; 
    hasReadSelect.appendChild(hasReadOptionFalse);

    bookFormContainer.appendChild(hasReadSelect);

    /* Create the add to library button */
    const addToLibrary = document.createElement("button");
    addToLibrary.classList.add("add-to-library");
    addToLibrary.innerText = "Add book to library!";

    addToLibrary.addEventListener("click", () => {
        const title = document.querySelector("#book_title").value;
        const author = document.querySelector("#book_author").value;
        const pages = document.querySelector("#book_pages").value;
        const hasRead = hasReadSelect.value;

        // saves all the data into an array
        const bookValues = [];
        bookValues.push(title,author,pages,hasRead);

        if (checkIfNotBlank(bookValues)) {
            return;
        }


        addBookToLibrary(title, author, pages, hasRead);

        // Limpiar tabla y volver a generar
        const bookShelf = document.querySelector("#library tbody");
        bookShelf.innerHTML = "";
        createBookCard(myLibrary);

    });

    bookFormContainer.appendChild(addToLibrary);

}

/* function to avoid blank entries */
function checkIfNotBlank (bookValues) {

    let isBlank = false;

    bookValues.forEach(value => {
        value === "" ? isBlank = true : "";
    })

    return isBlank;

}