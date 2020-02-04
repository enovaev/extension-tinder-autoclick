const userID = '';
const token = '';


const start = () => {
  // create panel
  const container = document.createElement('div');
  const btnLike = document.createElement('button');
  const btnOpt = document.createElement('img');
  const btnMess = document.createElement('button');

    container.className = 'container';
    btnOpt.src = chrome.runtime.getURL("images/icon.png");
    btnLike.className = 'btn';
    btnMess.className = 'btn';

    btnLike.innerText = 'Start click';
    btnMess.innerText = 'Start message';

  container.appendChild(btnMess);
  container.appendChild(btnOpt);
  container.appendChild(btnLike);

  // create modal
  const window = document.createElement('div');
  const modal = document.createElement('div');
  const titleModal = document.createElement('h2');
  const inputLike = document.createElement('input');
  const inputMess = document.createElement('input');
  const textMess = document.createElement('textarea');
  const btnSave = document.createElement('button');

    window.className = 'window hide';
    modal.className = 'modal';
    titleModal.className = 'title';
    inputLike.className = 'inputText';
    inputMess.className = 'inputText';
    btnSave.className = 'modal-btn';
    textMess.className = 'textarea';

    titleModal.innerText = 'Настройка';
    btnSave.innerText = 'Сохранить';

    inputLike.value = localStorage.like ? localStorage.like : '';
    textMess.value = localStorage.mess ? localStorage.mess : '';
    inputMess.value = localStorage.messQuan ? localStorage.messQuan : '';

    inputLike.placeholder = 'Кол-во лайков';
    inputMess.placeholder = 'Кол-во сообщ.';
    textMess.placeholder = 'Текст сообщения';

  modal.appendChild(titleModal);
  modal.appendChild(inputLike);
  modal.appendChild(inputMess);
  modal.appendChild(textMess);
  modal.appendChild(btnSave);

  window.appendChild(modal);

  // render element
  const parent = document.getElementById('content');

  parent.appendChild(container);
  parent.appendChild(window);

  // flags
  let isLike = false;
  let stopLike = false;
  let isMess = false;

  // obj
  const paramSend = new URLSearchParams({
    locale: 'ru',
  });
  const paramMatch = new URLSearchParams({
    count: 60,
    is_tinder_u: false,
    locale: 'ru',
    message: 0,
  });

  // func
  const cleanAll = (time) => {
    clearTimeout(time);
    isLike = false;
    stopLike = false;
    btnLike.innerText = 'Start click';
  };

  const sendMess = (body) => {
    return fetch(`https://api.gotinder.com/user/matches/${body.matchId}?${paramSend.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
      },
      body: JSON.stringify(body),
    })
  };

  // event
  btnOpt.addEventListener('click', () => {
    if (isLike) return;
    window.className = 'window';
  });

  btnSave.addEventListener('click', () => {
    window.className = 'window hide';
    localStorage.setItem('like', inputLike.value);
    localStorage.setItem('messText', textMess.value);
    localStorage.setItem('messQuan', inputMess.value);
  });

  btnLike.addEventListener('click', () => {
    const value = Number(localStorage.like);
    let i = 0;

    if (isLike) {
      isLike = false;
      btnLike.innerText = 'Start click';
      return stopLike = true;
    }
    if (!value) return alert('Неккоректо введено количество лайков в панели настроек!');

    const time = () => setTimeout(() => {
      const like = document.querySelectorAll('button.button')[3];
      if (!like) {
        cleanAll(time);
        return alert('Ошибка! На странице не найдена кнопка! Перейдите на https://tinder.com/app/recs и попробуйте снова.');
      }
      if (i === value) {
        cleanAll(time);
        return alert(`Успешно! Было совершено ${i} лайка(ов).`);
      }
      if (stopLike) {
        cleanAll(time);
        return alert(`Остановлено! Было совершено ${i} лайка(ов).`);
      }

      i++;
      btnLike.innerText = `Stop ${i}`;
      like.click();
      time();
    }, 500);

    time();
    isLike = true;
  });

  btnMess.addEventListener('click', async () => {
    const messQuan = Number(localStorage.messQuan);

    if (isMess) return;
    if (!localStorage.mess.length) return alert('Введите тескт сообщения в настройках.');
    if (!messQuan) return alert('Неккоректо введено количество сообщений в панели настроек!');

    if (await confirm('Вы уверены что хотить отправить сообщения с текстом: \n' + localStorage.messText + ' ?')) {
      try {
        let query =  await fetch(`https://api.gotinder.com/v2/matches?${paramMatch.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
        });
        const { data } = await query.json();
        const { matches } = data;

        const arrMatch = matches.slice(0, messQuan);

        if(!matches.length) return alert('У вас нет matches (');

        async function processArray(array) {
          try {
            for (const el of array) {
              const body = {
                userId: userID,
                otherId: el.person._id,
                tempMessageId: Math.random(),
                matchId: el.id,
                match: el,
                sessionId: null,
                message: localStorage.messText,
              };
              await sendMess(body);
            }
          } catch (e) {
            alert(`Ошибка! Сообщения не были отправлены :(`);
          }
        }

        await processArray(arrMatch);

        isMess = false;
        alert(`Успешно! Было отправлено ${arrMatch.length} сообщения(ий)`);
      } catch {
        isMess = false;
        alert(`Ошибка! Сообщения не были отправлены :(`);
      }
    }
  });
};
start();