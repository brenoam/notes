export default class Note {
	constructor({id, title, text, color}, notesController) {
		this.id = id;
		this.title = title;
		this.text = text;
		this.notesController = notesController;
		this.color = color || "#f5d442";
	}
	
	getTemplate() {
		return `<div class="note flex-item" id="{{id}}" style="--note-color:{{color}}">
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

	getEditTemplate() {
		return `<div class="modal">
			<div class="modal-note-edit" style="--note-color:{{color}}">
				<div class="note-delete">
					<i class="fas fa-times"></i>
				</div>
				<div class="note-title" contenteditable="true">
					{{title}}
				</div>
				<div class="note-text" contenteditable="true">
					{{text}}
				</div>
				<div class="color-picker flex-container">
					<span class="color-item" style="--pckr-color:#F5D442"> </span>
					<span class="color-item" style="--pckr-color:#F08080"> </span>
					<span class="color-item" style="--pckr-color:#87CEFA"> </span>
					<span class="color-item" style="--pckr-color:#40E0D0"> </span>
					<span class="color-item" style="--pckr-color:#8FBC8F"> </span>
				</div>
			</div>
		</div>`;
	}
	
	getRenderEl() {
		let el = this.getTemplate();
		el = el.replace('{{id}}', this.id);
		el = el.replace('{{title}}', this.title?this.title: "");
		el = el.replace('{{text}}', this.text? this.text: "");
		el = el.replace('{{color}}', this.color);
		return el;
	}

	getRenderEditEl() {
		let el = this.getEditTemplate();
		el = el.replace('{{title}}', this.title?this.title: "");
		el = el.replace('{{text}}', this.text? this.text: "");
		el = el.replace('{{color}}', this.color);
		return el;
	}

	render() {
		var notes = document.getElementsByClassName("notes")[0];
		let noteHtml = this.getRenderEl();
		let noteEl = document.createElement('div');
		noteEl.innerHTML = noteHtml;
		notes.appendChild(noteEl.firstChild);
		this.addNoteEventListeners();
	}

	removeNote() {
		this.notesController.notes = this.notesController.notes.filter(ctrlrNote => ctrlrNote.id === this.id);
		document.getElementById(this.id).remove()
		event.stopPropagation()
	}

	renderNoteEdit(){
		let modal = this.getRenderEditEl();
		let modalEl = document.createElement('div');
		modalEl.innerHTML = modal;
		document.body.appendChild(modalEl.firstChild);
		this.addModalEventListeners();
	}

	saveNote() {
		console.log("save");
		let modalContent = document.getElementsByClassName("modal-note-edit")[0];
		let title = modalContent.getElementsByClassName("note-title")[0].innerText;
		let text = modalContent.getElementsByClassName("note-text")[0].innerText;
		let color = modalContent.style.getPropertyValue("--note-color");
		this.title = title;
		this.text = text;
		this.color = color;
		let oldNote = document.getElementById(this.id);

		let noteHtml = this.getRenderEl();
		let noteEl = document.createElement('div');
		noteEl.innerHTML = noteHtml;
		oldNote.replaceWith(noteEl.firstChild);
		this.addNoteEventListeners();
		this.removeModal();
	}

	removeModal() {
		let modal = document.getElementsByClassName("modal")[0];
		modal.remove();
		event.stopPropagation();
	}

	addNoteEventListeners() {
		let note = document.getElementById(this.id)
		note.getElementsByClassName("note-delete")[0].addEventListener('click', this.removeNote.bind(this), false);
		note.addEventListener('click', this.renderNoteEdit.bind(this), false);
	}

	changeModalColor() {
		let color = this.style.getPropertyValue("--pckr-color");
		document.getElementsByClassName("modal-note-edit")[0].style.setProperty("--note-color", color);
	}

	addModalEventListeners() {
		let modal = document.getElementsByClassName("modal")[0]
		let modalContent = modal.getElementsByClassName("modal-note-edit")[0]
		modalContent.getElementsByClassName("note-delete")[0].addEventListener('click', this.removeModal);
		let colorPicker = modalContent.getElementsByClassName("color-item");
		Object.keys(colorPicker).forEach(key => {
			colorPicker[key].addEventListener('click', this.changeModalColor);
		});
		modalContent.addEventListener("click", (e) => e.stopPropagation(), false);
		modal.addEventListener('click', this.saveNote.bind(this), false);
	}
}