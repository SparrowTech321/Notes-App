const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || '';
  attachNoteEvents(); // Attach event listeners to existing notes
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

function attachNoteEvents() {
  notesContainer.querySelectorAll(".input-box").forEach(nt => {
    nt.onkeyup = updateStorage;
  });
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);
  attachNoteEvents(); // Attach event listeners to the new note
  updateStorage(); // Update storage with the new note
});

notesContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

// Initialize the app
showNotes();
