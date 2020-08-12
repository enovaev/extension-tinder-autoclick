import { Modal } from "./Modal";

export class ModalSettings extends Modal {
  template = `
    <div class="set-modal">
      <div class="btn-tabs">
        <div class="tab active">Click</div>
        <div class="tab">Message</div>
      </div>
      <div class="separator"></div>
      <div class="body-modal">
        <div class="field">
          <div class="field-content">
            <span class="label-field">Тестовый режим:</span>
            <input id="testCheck" type="checkbox">
          </div>
        </div>
          <div class="field">
            <div class="field-content">
              <span class="label-field">Количество персон:</span>
              <input id="inputQuantity" type="number" class="input">
            </div>
          </div>
          <div class="field">
            <div class="field-content">
              <span class="label-field">Количество фото:</span>
              <input id="inputPhoto" type="number" class="input">
            </div>
          </div>
          <div class="field">
            <div class="field-content">
              <span class="label-field">Возраст:</span>
              <input id="inputAge" type="number" class="input">
            </div>
            <div id="chips-age" class="chips-container"></div>
          </div>
          <div class="field">
            <div class="field-content">
              <span class="label-field">Ключевые слова (ВУЗ):</span>         
              <input id="inputInfo" class="input">
            </div>
            <div id="chips-university" class="chips-container"></div>
          </div>
          <div class="field">
            <div class="field-content">
              <span class="label-field">Исключаемые слова (Описание):</span>              
              <input id="inputDescription" class="input">
            </div>
            <div id="chips-description" class="chips-container"></div>
          </div>
      </div>
      <div class="separator"></div>
  </div>
  `
  constructor(parent) {
    super(parent);
    super.setContent(this.template);
    this.applySettings = null;
    this.inputQuantity = document.querySelector('#inputQuantity');
    this.inputPhoto = document.querySelector('#inputPhoto');
    this.inputAge = document.querySelector('#inputAge');
    this.testCheck = document.querySelector('#testCheck');
    this.inputInfo = document.querySelector('#inputInfo');
    this.inputDescription = document.querySelector('#inputDescription');

    this.addListeners();
  }
  addListeners() {
    this.inputInfo.addEventListener('keydown', this.keydownHandler.bind(this));
    this.inputDescription.addEventListener('keydown', this.keydownHandler.bind(this));
    this.inputAge.addEventListener('keydown', this.keydownHandler.bind(this));
  }
  removeListeners() {
  }
  addChips(a) {
    if(a === this.inputAge.id) {

    }
    if(a === this.inputInfo.id) {

    }
    if(a === this.inputDescription.id) {

    }
  }
  keydownHandler(e) {
    if(e.key === 'Enter') this.addChips(e.target.id);
  }
  changeVisible(data) {
    super.changeVisible();
    if(data) this.setData(data);
  }
  setData(data) {
    this.inputQuantity.value = data.quantity;
    this.inputPhoto.value = data.photo;
    this.testCheck.checked = !!data.test;
    this.chipsInfo = data.info;
    this.chipsDescription = data.description;
    this.chipsAge = data.age;
  }
  applyModal() {
    super.applyModal();
    this.applySettings(this.getData());
  }
  getData() {
    return {
      quantity: this.inputQuantity.value,
      photo: this.inputPhoto.value,
      test: Number(this.testCheck.checked),
    }
  }
}