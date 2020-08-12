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
    this.parent.insertAdjacentHTML('afterend', this.template);
    this.container = document.querySelector('.window');

    document.querySelector('.btn-modal.close').addEventListener('click', this.changeVisible.bind(this));
    document.querySelector('.btn-modal.save').addEventListener('click', this.applyModal.bind(this));
    document.querySelector('.close-modal-img').addEventListener('click', this.changeVisible.bind(this))
  }
  changeVisible() {
    this.visible = !this.visible;
    if(this.visible) this.container.classList.remove('hide');
    else this.container.classList.add('hide');
  }
  applyModal() {
    this.changeVisible();
  }
  setContent(template) {
    document.querySelector('.innerModal').innerHTML = template;
  }
}