import Note from './Note.js';
export default class NoteController {
	constructor(notes){
		this.notes = (notes || []).map(note => new Note(note, this));
		this._idGenerator = this.notes.length? Math.max(...this.notes.map(note => note.id)): 0;
		this.notes.forEach(note => note.render());
	}
	
	generateId() {
		this._idGenerator++;
		return this._idGenerator;
	};
	
	addNote(title, text) {
		let note = new Note({id:this.generateId(), title: title, text:text}, this);
		this.notes.push(note);
		note.render();
	}
}