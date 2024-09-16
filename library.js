console.log('this is library js file');
showBookList();
// create object book
let Book = function (bname, author, type) {
        this.bname = bname,
        this.author = author,
        this.type = type
}

// constructor to display method
function Display() {

}

//add to display method prototype 
Display.prototype.add = function (book) {
    console.log('write here ui part');
    let tablebody = document.getElementById('tableBody');
    let domString;
    domString = `<tr>
                <td>${book.bname}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
               <td><button type ="button">delete</button></td>
            </tr>`;
    tablebody.innerHTML += domString;

}

// clear method
Display.prototype.clear = function () {
    let libraryform = document.getElementById('libraryForm');
    libraryform.reset();
}

// add vaidation method
Display.prototype.validation = function (book) {
    if (book.bname.length <2 && book.author.length <2) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (alertType,alertMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
                <strong>Message !</strong> ${alertMessage}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
            setTimeout(function(){
                message.innerHTML = ""
            },2000);
}


// add eventListner onSubmit of form
let libraryform = document.getElementById('libraryForm');
libraryform.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let bookname = document.getElementById('BookName').value;
    let author = document.getElementById('author').value;
    let Type;
    let type1 = document.getElementById('bookType1');
    let type2 = document.getElementById('bookType2');
    let type3 = document.getElementById('bookType3');
    let type4 = document.getElementById('bookType4');
    if (type1.checked) {
        Type = type1.value;
    }
    else if (type2.checked) {
        Type = type2.value;
    }
    else if (type3.checked) {
        Type = type3.value;
    }
    else if (type4.checked) {
        Type = type4.value;
    }

    let book = new Book(bookname, author, Type);
    console.log(book);

    // creating display object 
    let display = new Display();
         if (display.validation(book)) {
          
            // adding list to the localStorage
            let bookList = localStorage.getItem('Booklist');
            if(bookList == null){
                bookListObj = [];
            }else{
                bookListObj = JSON.parse(bookList);
            }
            bookListObj.push([bookname,author,Type]);
            // bookListObj.push(book);
            localStorage.setItem('Booklist',JSON.stringify(bookListObj));       
        display.add(book);
        display.clear();
        display.show('success','you have been succcessfully added!');
    } else {
        display.show('danger','there is some error please check it carefully !');
    }
    e.preventDefault();
}

// show method to view the Book List

function showBookList(){
    let bookList = localStorage.getItem('Booklist');
    if(bookList == null){
        bookListObj = [];
    }else{
        bookListObj = JSON.parse(bookList);
    }
    let domString;
    let tablebody = document.getElementById('tableBody');
    bookListObj.forEach(function(book,i) {
        domString = `<tr>
                <td>${book.bname}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
                <td><button type ="button" onClick=`deleteItem(${i})`>delete</button></td>
            </tr>`;
        tablebody.innerHTML += domString;    
    });
}
function deleteItem(index){
        let bookList = localStorage.getItem('Booklist');
        bookListObj = JSON.parse(bookList);
        bookList = bookList.filter((item,i)=> i != index);
        localStorage.setItem('Booklist',JSON.stringify(bookList));
        window.location.reload();
}
