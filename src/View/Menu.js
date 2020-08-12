class Menu {
  template = `
    <div class="container">
      <button class="btn start-mess">Start message</button>
      <img class="img-settings" src="${chrome.runtime.getURL("images/icon.png")}">
      <button class="btn start-click">Start click</button>
    </div>`;

  constructor(parent) {
    this.parent = parent;
    this.parent.insertAdjacentHTML('beforeend', this.template);
    this.onClickSettings = null;
    this.onClickStart = null;
    document.querySelector('.img-settings')
      .addEventListener('click', () => this.onClickSettings());
    document.querySelector('.btn.start-click')
      .addEventListener('click', () => this.onClickStart());
  }
}


export { Menu };