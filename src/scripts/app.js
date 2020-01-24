import NoteController from './NoteController.js'

var noteCtrl = new NoteController();

function addNote(){
	noteCtrl.addNote('title', 'text');
}

document.getElementById("addNoteBtn").addEventListener('click', addNote);