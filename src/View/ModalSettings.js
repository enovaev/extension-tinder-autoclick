import { Modal } from "./Modal";
import config from '../config/chipsConfig.json';

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
          <div id="chips-info" class="chips-container"></div>
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
  constructor(parent, chips) {
    super(parent);
    super.setContent(this.template);
    this.Chips = chips;
    this.applySettings = null;
    this.inputQuantity = document.querySelector('#inputQuantity');
    this.inputPhoto = document.querySelector('#inputPhoto');
    this.inputAge = document.querySelector('#inputAge');
    this.testCheck = document.querySelector('#testCheck');
    this.inputInfo = document.querySelector('#inputInfo');
    this.inputDescription = document.querySelector('#inputDescription');

    this.chipsInfo = [];
    this.chipsDescription = [];
    this.chipsAge = [];

    this.keydown = this.keydownHandler.bind(this);
  }
  addListenersModal() {
    this.inputInfo.addEventListener('keydown', this.keydown);
    this.inputDescription.addEventListener('keydown', this.keydown);
    this.inputAge.addEventListener('keydown', this.keydown);
  }
  removeListenersModal() {
    this.inputInfo.removeEventListener('keydown', this.keydown);
    this.inputDescription.removeEventListener('keydown', this.keydown);
    this.inputAge.removeEventListener('keydown', this.keydown);
  }
  createInstChip(conf, index, text) {
    conf.index = index;
    conf.text = text;

    const chip = new this.Chips(conf);
    chip.deleteChips = this.deleteChips.bind(this);
    return chip;
  }
  addChips(id, value) {
    const obj = config[id];
    if(id === this.inputAge.id) {
      const chip = this.createInstChip(obj, this.chipsAge.length, this.inputAge.value || value);
      this.chipsAge.push(chip);
      this.inputAge.value = '';
    }
    if(id === this.inputInfo.id) {
      const chip = this.createInstChip(obj, this.chipsInfo.length, this.inputInfo.value || value);
      this.chipsInfo.push(chip);
      this.inputInfo.value = '';
    }
    if(id === this.inputDescription.id) {
      const chip = this.createInstChip(obj, this.chipsDescription.length, this.inputDescription.value || value);
      this.chipsDescription.push(chip);
      this.inputDescription.value = '';
    }
  }
  deleteChips(id, name) {
    this[name] = this[name].filter(a => a.id !== id);
  }
  keydownHandler(e) {
    if(e.key === 'Enter') this.addChips(e.target.id);
  }
  changeVisible(data) {
    this.clear();
    super.changeVisible();
    this.chipsInfo.forEach(item => item.destroyChip());
    this.chipsDescription.forEach(item => item.destroyChip());
    this.chipsAge.forEach(item => item.destroyChip());

    if (data && 'quantity' in data) this.setData(data);
  }
  setData(data) {
    this.inputQuantity.value = data.quantity;
    this.inputPhoto.value = data.photo;
    this.testCheck.checked = !!data.test;
    data.age.forEach(value => this.addChips('inputAge', value));
    data.info.forEach(value => this.addChips('inputInfo', value));
    data.description.forEach(value => this.addChips('inputDescription', value));
    this.addListenersModal();
  }
  applyModal() {
    this.applySettings(this.getData());
    super.applyModal();
  }
  getData() {
    return {
      quantity: this.inputQuantity.value,
      photo: this.inputPhoto.value,
      test: Number(this.testCheck.checked),
      age: this.chipsAge.map(item => item.value),
      info: this.chipsInfo.map(item => item.value),
      description: this.chipsDescription.map(item => item.value),
    }
  }
  clear() {
    this.inputQuantity.value = '';
    this.inputPhoto.value = '';
    this.inputAge.value = '';
    this.inputInfo.value = '';
    this.inputDescription.value = '';
    this.removeListenersModal();
  }
}