// console.log("App JS is now included");

let container = document.querySelector(".container");
showNotes();

//When user clicks on Add Note Button
let btn = document.getElementById("addNote");
btn.addEventListener('click', () => {
    // console.log("Button was clicked")
    let text = document.getElementById("textArea");
    let title = document.getElementById("title");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        noteArray = [];
    }
    else {
        noteArray = JSON.parse(notes);
    }
    let notesObj = {
        mytitle : title.value,
        textNote : text.value 
    }
    //console.log(notesObj);
    //console.log(title);
    noteArray.push(notesObj);

    localStorage.setItem("notes", JSON.stringify(noteArray));
    text.value = "";
    title.value = "";

    showNotes();
})


function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteArray = [];
    }
    else {
        noteArray = JSON.parse(notes);
    }

    let html = ``;
    noteArray.forEach((element, index) => {
        html += `<div class="noteCard card mx-2 my-2" style="width: 18rem;border-radius: 1.2rem;" >
        <div class="card-body d-flex" style="align-items: center;flex-direction: column;">
            <h5 class="card-title" style="border-bottom: 0.5px solid black;">${element.mytitle}</h5>
            <p class="card-text">${element.textNote}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger" >Delete</a>
        </div>
    </div>`;

    });

    let notesElement = document.getElementById("notes");
    if(noteArray.length != 0){
        notesElement.innerHTML = html;
    }
    else{
        notesElement.innerHTML = `Nothing to show, please add note to view it here!!`
    }

    //let delBtn = document.getElementById("deleteNote");
}

function deleteNote(index){
    // console.log("I am clicked"+ index);
    let notes = localStorage.getItem("notes");
    if(notes ==  null){
        noteArray =[];
    }
    else{
        notesArray = JSON.parse(notes);
    }
    //console.log(noteArray);
    noteArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteArray));
    showNotes();
}

let search = document.getElementById("search");
search.addEventListener('input',function(){
    //console.log("input fired");
    let inputVal = search.value.toLowerCase();
    //console.log(inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    //console.log(noteCards);
    let noteCardArray =Array.from(noteCards);
    //console.log(noteCardArray);
    noteCardArray.forEach(function(element){
        let cardText =element.getElementsByTagName("p")[0].innerText.toLowerCase();
        //console.log(cardText);
        if(cardText.includes(inputVal)){
            
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })

})
