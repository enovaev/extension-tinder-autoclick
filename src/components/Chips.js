export class Chips {
  template = (style, text, id) => `
    <div class="chips ${style}">
      <span class="chips-text">${text}</span>
      <img id="${id}" class="close-chips" src="${chrome.runtime.getURL("images/close.png")}">
    </div>
  `
  constructor({ style, text, selector, name }) {
    this.style = style ? 'negative' : 'positive';
    this.text = text;
    this.name = name;
    this.deleteChips = null;
    this.parent = document.querySelector(selector);
    this.id = Math.random().toString();
    this.parent.insertAdjacentHTML('beforeend', this.template(this.style, this.text, this.id));
    this.btn = document.getElementById(this.id);

    this.destroy = this.destroyChip.bind(this);
    this.btn.addEventListener('click', this.destroy);
  }

  destroyChip() {
    this.btn.removeEventListener('click', this.destroy);
    this.btn.parentElement.remove();
    this.deleteChips(this.id, this.name);
  }

  get value() {
    return this.text;
  }
}