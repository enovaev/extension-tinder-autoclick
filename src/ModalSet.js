import template from "./template/template";
import Chips from "./Chips";

class Modal {
  templateModal = template.modal;

  constructor() {
    this.window = document.createElement('div');
    this.openModal = false;
  }
  renderModal(parent) {
    if(parent) {
      this.window.className = 'window hide';
      this.window.innerHTML = this.templateModal;
      parent.appendChild(this.window);
      this.closeBtn = document.querySelector('.close-modal-img');
      this.closeBtn.src = chrome.runtime.getURL("images/close.png");
    }
    this.addListener();
  }
  addListener() {
    this.closeBtn.addEventListener('click', this.openClose.bind(this));
    document.querySelector('.btn-modal.close').addEventListener('click', this.openClose.bind(this));
  }
  openClose() {
    this.openModal = !this.openModal;
    if(this.openModal) this.window.className = 'window';
    else  this.window.className = 'window hide';
  }
}

export default class extends Modal {
  templateModalSet = template.modalSet;

  constructor(parent) {
    super();
    this.renderModal(parent);
    this.setContent();
    this.inputQuantity = document.querySelector('#inputQuantity');
    this.inputPhoto = document.querySelector('#inputPhoto');
    this.inputAge = document.querySelector('#inputAge');
    this.testCheck = document.querySelector('#testCheck');
    this.inputUniversity = document.querySelector('#inputUniversity');
    this.inputDescription = document.querySelector('#inputDescription');
    this.getDataFromStorage();
    this.chipsUniversityComponent = new Chips( '#chips-university', false, 'university', this.arrUniversity, this.deleteChip.bind(this));
    this.chipsDescriptionComponent = new Chips( '#chips-description', true, 'description', this.arrDescription, this.deleteChip.bind(this));
    this.chipsAgeComponent = new Chips( '#chips-age', false, 'age', this.arrAge, this.deleteChip.bind(this));
    this.addListenerSet();
  }

  setContent() {
    document.querySelector('.innerModal').innerHTML = this.templateModalSet;
  }

  addListenerSet() {
    document.querySelector('.btn-modal.save').addEventListener('click', this.saveModalData.bind(this));
    this.inputUniversity.addEventListener('keydown', (e) => e.key === 'Enter' && this.saveChips('university'));
    this.inputDescription.addEventListener('keydown', (e) => e.key === 'Enter' && this.saveChips('description'));
    this.inputAge.addEventListener('keydown', (e) => e.key === 'Enter' && this.saveChips('age'));
  }

  saveChips(type) {
    if(type === 'university' && this.inputUniversity.value) {
      this.arrUniversity.push(this.inputUniversity.value);
      this.inputUniversity.value = '';
      this.chipsUniversityComponent.renderChips(this.arrUniversity);
    }
    if(type === 'description' && this.inputDescription.value) {
      this.arrDescription.push(this.inputDescription.value);
      this.inputDescription.value = '';
      this.chipsDescriptionComponent.renderChips(this.arrDescription);
    }
    if(type === 'age' && this.inputAge.value) {
      this.arrAge.push(this.inputAge.value);
      this.inputAge.value = '';
      this.chipsAgeComponent.renderChips(this.arrAge);
    }
  }

  deleteChip(item, type) {
    if(type === 'university') {
      this.arrUniversity = this.arrUniversity.filter(el => el !== item);
      this.chipsUniversityComponent.renderChips(this.arrUniversity);
    }
    if(type === 'description') {
      this.arrDescription = this.arrDescription.filter(el => el !== item);
      this.chipsDescriptionComponent.renderChips(this.arrDescription);
    }
    if(type === 'age') {
      this.arrAge = this.arrAge.filter(el => el !== item);
      this.chipsAgeComponent.renderChips(this.arrAge);
    }
  }

  saveModalData() {
    localStorage.setItem('university', JSON.stringify(this.arrUniversity));
    localStorage.setItem('description', JSON.stringify(this.arrDescription));
    localStorage.setItem('age', JSON.stringify(this.arrAge));
    localStorage.setItem('quantity', this.inputQuantity.value);
    localStorage.setItem('photo', this.inputPhoto.value);
    localStorage.setItem('test', this.testCheck.checked ? '1' : '0');
    this.openClose();
  }

  getDataFromStorage() {
    this.arrUniversity = localStorage.getItem('university') ? JSON.parse(localStorage.getItem('university')) : [];
    this.arrDescription = localStorage.getItem('description') ? JSON.parse(localStorage.getItem('description')) : [];
    this.arrAge = localStorage.getItem('age') ? JSON.parse(localStorage.getItem('age')) : [];
    this.inputQuantity.value = localStorage.getItem('quantity') ? localStorage.getItem('quantity') : '';
    this.inputPhoto.value = localStorage.getItem('photo') ? localStorage.getItem('photo') : '';
    this.testCheck.checked = Number(localStorage.getItem('test')) === 1;
  }

  openModalSet() {
    this.getDataFromStorage();
    this.chipsUniversityComponent.renderChips(this.arrUniversity);
    this.chipsDescriptionComponent.renderChips(this.arrDescription);
    this.chipsAgeComponent.renderChips(this.arrAge);
    super.openClose();
  }
}