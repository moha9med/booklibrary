var bookContainer=[];
var books = document.getElementById("books");
var addBook = document.getElementById("addBook");
var bookName = document.getElementById("bookName");
var bookAuthor = document.getElementById("bookAuthor");
var bookImg = document.getElementById("bookImg");


    var http = new XMLHttpRequest();
    http.open("GET","https://www.googleapis.com/books/v1/volumes?q=java");
    http.send();

    http.addEventListener("readystatechange", function(){
        if (http.readyState == 4 && http.status == 200){
            bookContainer = JSON.parse(http.response);
            displayBooks();
        }
    })


    function addBookFun(e){

        e.preventDefault();
        var ContainerBooks = books.innerHTML;
        var bookCon = {
            name: bookName.value,
            author: bookAuthor.value,
            image: bookImg.value,
        }
    
        ContainerBooks =  `<li class='nav-item border m-3'>
        <div class="d-flex justify-content-between p-5"> 
            <div>
                <h4 id='title'>`+bookName.value+`</h4>
                <div id='desc'>by: `+bookAuthor.value+`</div>
            </div>
            <div>
                <div id='desc'><img src=`+bookImg.value+`></div>
            </div>
        </div>
    </li>`+ContainerBooks
    
         bookContainer.items.push(bookCon);
         books.innerHTML = ContainerBooks;
    
         
    
        
    }
    

function displayBooks(){

    var ContainerBooks = "";
    for (var i=0;i<bookContainer.items.length;i++){

        ContainerBooks +=  `<li class='nav-item border m-3'>
                                <div class="d-flex justify-content-between p-5"> 
                                    <div>
                                        <h4 id='title'>`+bookContainer.items[i].volumeInfo.title+`</h4>
                                        <div id='desc'>by: `+bookContainer.items[i].volumeInfo.authors+`</div>
                                    </div>
                                    <div>
                                        <div id='desc'><img src=`+bookContainer.items[i].volumeInfo.imageLinks.smallThumbnail+`></div>
                                    </div>
                                </div>
                            </li>`
    }
    books.innerHTML = ContainerBooks;
}

    
function searchbooks(term) {

    var searchContainer = "";
    var searchResults = "";
    var newtxt = "";
    for (i = 0; i < bookContainer.items.length; i++) {
        if (bookContainer.items[i].volumeInfo.title.includes(term.trim()) == true) {

            searchContainer += `<li class='nav-item border m-3'>
            <div class="d-flex justify-content-between p-5"> 
                <div>
                    <h4 id='title'>`+bookContainer.items[i].volumeInfo.title+`</h4>
                    <div id='desc'>by: `+bookContainer.items[i].volumeInfo.authors+`</div>
                </div>
                <div>
                    <div id='desc'><img src=`+bookContainer.items[i].volumeInfo.imageLinks.smallThumbnail+`></div>
                </div>
            </div>
        </li>`;

        


            newtxt = bookContainer.items[i].volumeInfo.title.replace(term, '<span style="color:red">' +
                term + '</span>')

            searchResults += "<p>" +
                newtxt + "</p>";
        }
    }

    document.getElementById("books").innerHTML = searchContainer;
    // document.getElementById("books").innerHTML = searchResults;
}





addBook.addEventListener("click", function(e){
    addBookFun(e);
})