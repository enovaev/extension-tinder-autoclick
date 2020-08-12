import template from './template/template';
import ModalSet from "./ModalSet";
import { Menu } from "./components/Menu";
import { ModelData } from "./ModelData";
import { ModalSettings } from './components/ModalSettings';
import './styles.css';

class InitApp {
  parent = document.querySelector('body.Expand');
  templateMain = template.main;
  constructor() {
    this.renderMain();
    this.btnStart = document.querySelector('.btn.start-click');
    this.btnOption = document.querySelector('.img-settings');
    this.btnOption.src = chrome.runtime.getURL("images/icon.png");
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
    this.btnOption.addEventListener('click', this.startSetting.bind(this));
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

// new InitApp();
class MainLogic {
  constructor(menu, modal, modelData) {
    this.menu = menu;
    this.modelData = modelData;
    this.modal = modal;
    this.modal.applySettings = this.applySettings.bind(this);
    this.menu.onClickSettings = this.openModal.bind(this);
    this.menu.onClickStart = this.startClick.bind(this);
  }

  applySettings(data) {
    this.modelData.saveData(data);
  }
  openModal() {
    this.modal.changeVisible(this.modelData.getData());
  }
  startClick() {
  }
}
const parent = document.querySelector('body.Expand');
const menu = new Menu(parent);
const modelData = new ModelData();
const modal = new ModalSettings(parent);
new MainLogic(menu, modal, modelData);
