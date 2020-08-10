import template from "./template/template";

export default class {
  templateChips = (style, text, id) => template.chips(style, text, id);

  constructor(selector, style, type, chips, deleteChip) {
    this.chips = chips;
    this.style = style ? 'negative' : 'positive';
    this.type = type;
    this.deleteChip = deleteChip;
    this.container = document.querySelector(selector);
    this.renderChips(this.chips);
  }
  renderChips(chips) {
    this.chips = chips;
    this.container.innerHTML = '';
    if(chips && chips.length) {
      this.chips.forEach(item => {
        const id = Math.random().toString();
        const chip = document.createElement('div');
        chip.innerHTML = this.templateChips(this.style, item, id);
        this.container.appendChild(chip);
        const closeBtn = document.getElementById(id);
        closeBtn.src = chrome.runtime.getURL("images/close.png");
        closeBtn.addEventListener('click', function clickClose() {
          closeBtn.removeEventListener('click', clickClose);
          this.deleteChip(item, this.type);
        }.bind(this))
      })
    }
  }
}