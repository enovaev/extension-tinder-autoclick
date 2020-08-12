export class Modal {
  template = `
    <div class="window hide">
      <div class="modal">
        <img class="close-modal-img" src="${chrome.runtime.getURL("images/close.png")}">
        <div class="innerModal"></div>
        <div class="btn-modal-container">
          <button class="btn-modal close">Cancel</button>
          <button class="btn-modal save">Save</button>
        </div>
      </div>  
    </div>
  `;

  constructor(parent) {
    this.visible = false;
    this.parent = parent;
    this.parent.insertAdjacentHTML('beforeend', this.template);
    this.container = document.querySelector('.window');

    this.close = document.querySelector('.btn-modal.close');
    this.save = document.querySelector('.btn-modal.save');
    this.btnClose = document.querySelector('.close-modal-img');

    this.change = this.changeVisible.bind(this);
    this.apply = this.applyModal.bind(this);
  }
  addListeners() {
    this.close.addEventListener('click', this.change);
    this.save.addEventListener('click', this.apply);
    this.btnClose.addEventListener('click', this.change);
  }
  removeListeners() {
    this.close.removeEventListener('click', this.change);
    this.save.removeEventListener('click', this.apply);
    this.btnClose.removeEventListener('click', this.change);
  }
  changeVisible() {
    this.visible = !this.visible;
    if(this.visible) {
      this.addListeners();
      this.container.classList.remove('hide');
    } else {
      this.removeListeners();
      this.container.classList.add('hide');
    }
  }
  applyModal() {
    this.changeVisible();
  }
  setContent(template) {
    document.querySelector('.innerModal').innerHTML = template;
  }
}