export class mainLogic {
  constructor(menu, modal, modelData) {
    this.menu = menu;
    this.modelData = modelData;
    this.modal = modal;
    this.startLike = false;
    this.modal.applySettings = this.applySettings.bind(this);
    this.menu.onClickSettings = this.openModal.bind(this);
    this.menu.onClickStart = this.startClick.bind(this);

    this.btnStart = document.querySelector('.btn.start-click');
  }

  applySettings(data) {
    this.modelData.saveData(data);
  }
  openModal() {
    this.modal.changeVisible(this.modelData.getData());
  }
  stopProcess(time) {
    clearTimeout(time);
    this.startLike = false;
    this.btnStart.innerText = 'Start click';
  }
  startClick() {
    const { info, description, quantity, photo, age, test } = this.modelData.getData();
    let i = 0;
    let likes = 0;

    if (this.startLike) {
      this.btnStart.innerText = 'Start click';
      return this.startLike = false;
    }
    this.btnStart.innerText = `Like: ${likes}`;
    this.startLike = true;

    const time = () => setTimeout(() => {
      if (i === +quantity || !this.startLike) {
        this.stopProcess(time);
        return;
      }

      let like;
      let next = document.querySelectorAll('button.button')[1];
      let card = document.querySelector('.recCard.active');
      const inform = card.querySelector('button.focus-button-style');

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
      inform.click(); // открываем дополнительную информацию
      setTimeout(() => {
        like = document.querySelectorAll('button.button')[2];
        next = document.querySelectorAll('button.button')[0];
        card = document.querySelector('.profileCard__card');

        if (!this.checkInfo(info, card) || !this.checkDescription(description, card)) {
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
      const photoPerson = card.querySelectorAll('button.bullet').length;
      if(photoPerson < photo) {
        console.log('несоответствие фото');
        return false;
      }
    }
    return true;
  }
  checkInfo(info, card) {
    if(info.length) {
      const fields = card.querySelectorAll('.Row');
      let string = '';
      for(let i = 0; i < fields.length; i++) {
        if(i === 0) string += fields[i].innerText;
        else string += `, ${fields[i].innerText}`;
      }
      const valid = info.map((item) => {
        const pos = string.toLocaleLowerCase().indexOf(item.toLowerCase());
        if (pos === -1) return false;
        return true;
      }).some(item => item);

      if(!valid) console.log('несоответствие инфо');
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
}