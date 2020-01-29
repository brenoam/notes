import NoteController from './NoteController.js'

var noteCtrl = new NoteController([
	{
		"id": 5,
		"text": "AAAAAAAA",
	},
	{
		"id": 50,
		"text": "AAAacjjiakvn oalAAAAA",
	}
]);

function addNote(){
	noteCtrl.addNote('title', 'text');
}

document.getElementById("addNoteBtn").addEventListener('click', addNote);