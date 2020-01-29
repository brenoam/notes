export default class Note {
	constructor({id, title, text}, notesController) {
		this.id = id;
		this.title = title;
		this.text = text;
		this.notesController = notesController;
	}
	
	getTemplate() {
		return `<div class="note" id="{{id}}">
				<div class="note-delete">
					<i class="fas fa-times"></i>
				</div>
				<div class="note-title">
					{{title}}
				</div>
				<div class="note-text">
					{{text}}
				</div>
			</div>`;
	}
	
	getRenderEl() {
		let el = this.getTemplate();
		el = el.replace('{{id}}', this.id);
		el = el.replace('{{title}}', this.title?this.title: "");
		el = el.replace('{{text}}', this.text? this.text: "");
		return el;
	}

	render() {
		var notes = document.getElementsByClassName("notes")[0];
		let noteHtml = this.getRenderEl();
		let noteEl = document.createElement('div');
		noteEl.innerHTML = noteHtml;
		notes.appendChild(noteEl.firstChild);
		this.addEventListeners(noteEl.firstChild)
	}

	removeNote() {
		this.notesController.notes = this.notesController.notes.filter(ctrlrNote => ctrlrNote.id === this.id);
		document.getElementById(this.id).remove()
	}

	addEventListeners() {
		let note = document.getElementById(this.id)
		note.getElementsByClassName("note-delete")[0].addEventListener('click', this.removeNote.bind(this), false);
	}
}