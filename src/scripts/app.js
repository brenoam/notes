import NoteController from './NoteController.js'

var noteCtrl = new NoteController();

function addNote(){
	noteCtrl.addNote();
}

document.getElementById("addNoteBtn").addEventListener('click', addNote);