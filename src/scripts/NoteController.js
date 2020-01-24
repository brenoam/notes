import Note from './Note.js';
export default class NoteController {
	constructor(notes){
		this.notes = notes || [];
		this._idGenerator = Math.max(this.notes.map(note => note.id));
		
		
	}
	
	generateId() {
		this._idGenerator++;
		return this._idGenerator;
	};
	
	renderNote(note) {
		var notes = document.getElementsByClassName("notes")[0];
		let noteHtml = note.getRenderEl();
		let noteEl = document.createElement('div');
		noteEl.innerHTML = noteHtml;
		notes.appendChild(noteEl);
	}
	
	addNote(title, text) {
		let note = new Note(this.generateId(), title, text);
		this.notes.push(note);
		this.renderNote(note);
	}
}