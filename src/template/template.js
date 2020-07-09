export default {
  main: `
    <button class="btn start-mess">Start message</button>
    <img class="img-settings">
    <button class="btn start-click">Start click</button>
  `,
  modal: `
      <div class="modal">
            <img class="close-modal-img">
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
      <img id="${id}" class="close-chips">
    </div>
  `
};
