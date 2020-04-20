const template = {
  main: `
    <button class="btn start-mess">Start message</button>
    <img class="img-settings" src="chrome-extension://idhklnaaoilehedjfeepjdjidfcjdhge/images/icon.png">
    <button class="btn start-click">Start click</button>
  `,
  modal: `
      <div class="modal">
            <img class="close-modal-img" src="chrome-extension://idhklnaaoilehedjfeepjdjidfcjdhge/images/close.png">
            <div class="innerModal"></div>
            <div class="btn-modal-container">
                <button class="btn-modal close">Cancel</button>
                <button class="btn-modal save">Save</button>
            </div>
      </div>  
  `,
  modalSet: `
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
                      <input id="inputUniversity" class="input">
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
  `,
  chips: (style, text, id) => `
    <div class="chips ${style}">
      <span class="chips-text">${text}</span>
      <img id="${id}" class="close-chips" src="chrome-extension://idhklnaaoilehedjfeepjdjidfcjdhge/images/close.png">
    </div>
  `
};

class InitApp {
  parent = document.querySelector('body.Expand');
  templateMain = template.main;
  constructor() {
    this.renderMain();
    this.btnStart = document.querySelector('.btn.start-click');
    this.modal = new ModalSet(this.parent);
    this.startLike = false;
    this.addListener();
  }

  renderMain() {
    if (this.parent) {
      const container = document.createElement('div');
      container.className = 'container';
      container.innerHTML = this.templateMain;
      this.parent.appendChild(container);
    }
  };
  addListener() {
    this.btnStart.addEventListener('click', this.startClick.bind(this));
    document.querySelector('.btn.start-mess').addEventListener('click', this.startMess.bind(this));
    document.querySelector('.img-settings').addEventListener('click', this.startSetting.bind(this));
  }
  getData() {
    return {
      university: JSON.parse(localStorage.getItem('university')),
      description: JSON.parse(localStorage.getItem('description')),
      quantity: Number(localStorage.getItem('quantity')),
      photo: Number(localStorage.getItem('photo')),
      age: JSON.parse(localStorage.getItem('age')),
      test: Number(localStorage.getItem('test')) === 1,
    }
  }
  stopProcess(time) {
    clearTimeout(time);
    this.startLike = false;
    this.btnStart.innerText = 'Start click';
  }
  startClick() {
    const { university, description, quantity, photo, age, test } = this.getData();
    let i = 0;
    let likes = 0;

    if (this.startLike) {
      this.btnStart.innerText = 'Start click';
      return this.startLike = false;
    }
    this.btnStart.innerText = `Like: ${likes}`;
    this.startLike = true;
    const time = () => setTimeout(() => {
      if (i === quantity) {
        this.stopProcess(time);
        return;
      }
      if (!this.startLike) {
        this.stopProcess(time);
        return;
      }

      let like;
      let next = document.querySelectorAll('button.button')[1];
      let card = document.querySelector('.recCard.active');
      const info = card.querySelector('button.focus-button-style');

      if (!next) {
        this.stopProcess(time);
        return alert('Ошибка! На странице не найдена кнопка! Перейдите на https://tinder.com/app/recs и попробуйте снова.');
      }
      if(!card) {
        return time();
      }
      if (!this.checkPhoto(photo, card) || !this.checkAge(age, card)) {
        i++;
        if(!test) {
          next.click();
          time();
        }
        return;
      }
      info.click(); // открываем дополнительную информацию
      setTimeout(() => {
        like = document.querySelectorAll('button.button')[2];
        next = document.querySelectorAll('button.button')[0];
        card = document.querySelector('.profileCard__card');

        if (!this.checkUniversity(university, card) || !this.checkDescription(description, card)) {
          i++;
          if(!test) {
            next.click();
            time();
          } else {
            const back = card.querySelector('a.focus-button-style');
            back.click();
          }
          return;
        }

        i++;
        likes++;
        console.log('like');
        this.btnStart.innerText = `Like: ${likes}`;
        if(!test) {
          like.click();
          time();
        }
      }, 500);
    }, 250);
    time();
  }
  checkAge(age, card) {
    if(age.length) {
      const div = card.querySelector('.Whs\\(nw\\)');
      if(!div) {
        console.log('несоответствие возраст');
        return false;
      }
      const personAge = div.innerText;
      const valid = age.some(item => Number(item) === Number(personAge));
      if(!valid) console.log('несоответствие возраст');
      return valid
    }
    return true;
  }
  checkPhoto(photo, card) {
    if(photo) {
      const photoPerson = card.querySelector('.react-swipeable-view-container').childNodes.length;
      if(photoPerson && Number(photoPerson) < photo) {
        console.log('несоответствие фото');
        return false;
      }
    }
    return true;
  }
  checkUniversity(university, card) {
    if(university.length) {
      const fields = card.querySelectorAll('.Row');
      let string = '';
      for(let i = 0; i < fields.length; i++) {
        if(i === 0) string += fields[i].innerText;
        else string += `, ${fields[i].innerText}`;
      }
      const valid = university.map((item) => {
        const pos = string.toLocaleLowerCase().indexOf(item.toLowerCase());
        if (pos === -1) return false;
        return true;
      }).some(item => item);
      if(!valid) console.log('несоответствие иститут');
      return valid;
    }
    return true;
  }
  checkDescription(description, card) {
    if(description.length) {
      const element = card.querySelector('.BreakWord');
      if(!element) return true;
      const descText = element.innerText;
      const valid = description.map((item) => {
        const pos = descText.toLocaleLowerCase().indexOf(item.toLowerCase());
        if (pos === -1) return false;
        return true;
      }).every(item => !item);
      if(!valid) console.log('несоответствие описание');
      return valid;
    }
    return true
  }
  startMess() {
  }
  startSetting() {
    this.modal.openModalSet();
  }
}
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
    }
    this.addListener();
  }
  addListener() {
    document.querySelector('.close-modal-img').addEventListener('click', this.openClose.bind(this));
    document.querySelector('.btn-modal.close').addEventListener('click', this.openClose.bind(this));
  }
  openClose() {
    this.openModal = !this.openModal;
    if(this.openModal) this.window.className = 'window';
    else  this.window.className = 'window hide';
  }
}
class ModalSet extends Modal {
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
    this.chipsUniversityComponent = new Chips( '#chips-university', false, 'university', this.arrUniversity);
    this.chipsDescriptionComponent = new Chips( '#chips-description', true, 'description', this.arrDescription);
    this.chipsAgeComponent = new Chips( '#chips-age', false, 'age', this.arrAge);
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

class Chips {
  templateChips = (style, text, id) => template.chips(style, text, id);

  constructor(selector, style, type, chips) {
    this.chips = chips;
    this.style = style ? 'negative' : 'positive';
    this.type = type;
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
        document.getElementById(id).addEventListener('click', function clickClose() {
          document.getElementById(id).removeEventListener('click', clickClose);
          this.deleteChip(item);
        }.bind(this))
      })
    }
  }
  deleteChip(item) {
    init.modal.deleteChip(item, this.type);
  }
}

const init = new InitApp();
