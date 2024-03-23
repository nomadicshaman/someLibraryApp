let bookInput = document.querySelector('.inputBox');
let addButton = document.querySelector('.addButton');




const myLibrary = [];

function Book() {

}



function addBookToLibrary() {
    myLibrary.push(bookInput.value);
    bookInput.value ='';
    console.log(myLibrary);
    
}

addButton.addEventListener('click', addBookToLibrary);




bookInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

      event.preventDefault();

      addButton.click();
    }
  }); 