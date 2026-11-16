// DOM Selection //
const currentDate = document.getElementById("current-date");
const currentTime = document.getElementById("current-time");

const addNoteBtn = document.getElementById("add-note-btn");
const noteFormContainer = document.getElementById("note-form-container");
const saveNoteBtn = document.getElementById("save-note-btn");
const cancelNoteBtn = document.getElementById("cancel-note-btn");

const noteTitle = document.getElementById("note-title");
const noteDescription = document.getElementById("note-description");
const notesContainer = document.getElementById("notes-container");

const searchInput = document.getElementById("search-input");

// Track Editing Note
let editingNote = null;


//  Live Date and Time

function updateDateTime() {

    const now = new Date();

    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString("en-US");

    currentDate.textContent = date;
    currentTime.textContent = time;

}

updateDateTime();
setInterval(updateDateTime, 1000);


//  Save Notes to localStorage

function saveNotesToStorage() {

    const allNotes = document.querySelectorAll(".note-card");

    const notes = [];

    allNotes.forEach(function (note) {

        notes.push({

            title: note.querySelector("h3").textContent,
            description: note.querySelector("p").textContent

        });

    });

    localStorage.setItem("myNotes", JSON.stringify(notes));

}


// Search Filter Function

function filterNotes() {

    const searchValue = searchInput.value.toLowerCase().trim();

    const allNotes = document.querySelectorAll(".note-card");

    allNotes.forEach(function (note) {

        const noteContent = note.textContent.toLowerCase();

        if (noteContent.includes(searchValue)) {

            note.style.display = "block";

        } else {

            note.style.display = "none";

        }

    });

}


// Add Note

addNoteBtn.addEventListener("click", function () {

    noteFormContainer.style.display = "block";

});


//  Cancel Note Form

cancelNoteBtn.addEventListener("click", function () {

    noteFormContainer.style.display = "none";

    noteTitle.value = "";
    noteDescription.value = "";

    editingNote = null;

    saveNoteBtn.textContent = "Save Note";

});


// Create Note Card Function

function createNoteCard(title, description) {

    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");

    // Create Title
    const noteHeading = document.createElement("h3");
    noteHeading.textContent = title;

    // Create Description
    const noteText = document.createElement("p");
    noteText.textContent = description;


    //  Edit Button

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", function () {

        noteTitle.value = noteHeading.textContent;
        noteDescription.value = noteText.textContent;

        editingNote = noteCard;

        noteFormContainer.style.display = "block";

        saveNoteBtn.textContent = "Update Note";

    });


    //  Delete Button

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {

        if (editingNote === noteCard) {

            editingNote = null;

            noteTitle.value = "";
            noteDescription.value = "";

            noteFormContainer.style.display = "none";

            saveNoteBtn.textContent = "Save Note";

        }

        noteCard.remove();

        // Update localStorage
        saveNotesToStorage();

    });


    // Add Elements to Card

    noteCard.appendChild(noteHeading);
    noteCard.appendChild(noteText);
    noteCard.appendChild(editBtn);
    noteCard.appendChild(deleteBtn);

    // Display Note
    notesContainer.appendChild(noteCard);

}


//  Save and Update Note

saveNoteBtn.addEventListener("click", function () {

    const title = noteTitle.value.trim();
    const description = noteDescription.value.trim();

    // Empty Input Validation
    if (title === "" || description === "") {

        alert("Please enter both title and description!");

        return;

    }


    // Update Existing Note

    if (editingNote !== null) {

        editingNote.querySelector("h3").textContent = title;

        editingNote.querySelector("p").textContent = description;

        editingNote = null;

        // Update localStorage
        saveNotesToStorage();

    }

    // Add New Note

    else {

        createNoteCard(title, description);

        // Save to localStorage
        saveNotesToStorage();

    }


    // Clear Inputs

    noteTitle.value = "";
    noteDescription.value = "";

    noteFormContainer.style.display = "none";

    saveNoteBtn.textContent = "Save Note";

    // Apply Search Filter
    filterNotes();

});


//  Search Notes

searchInput.addEventListener("input", function () {

    filterNotes();

});


//  Load Saved Notes

function loadSavedNotes() {

    let savedNotes = [];

    try {

        savedNotes = JSON.parse(localStorage.getItem("myNotes")) || [];

    } catch (error) {

        console.error("Error loading notes:", error);

    }


    savedNotes.forEach(function (note) {

        createNoteCard(note.title, note.description);

    });

    // Apply Search Filter
    filterNotes();

}


// Load Notes When Page Opens

loadSavedNotes();
