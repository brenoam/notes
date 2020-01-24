export default class Note {
	constructor(id, title, text) {
		this.id = id;
		this.title = title;
		this.text = text;
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
		el = el.replace('{{title}}', this.title);
		el = el.replace('{{text}}', this.text);
		return el;
	}
}