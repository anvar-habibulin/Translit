// слушатель события на нажатие кнопки энтер
(function() {
    document.querySelector('input').addEventListener('keydown', function(e) {
      if (e.keyCode === 13) {
        if(!isEmptyString()){
        createElement()
        }
      }
    });
  })();
  
  // слушатель события на кнопку Добавить
  document.querySelector('.buttonForAdd').addEventListener("click", (event) => {
    if(document.querySelector('input').value){
        if(!isEmptyString()){
        createElement()
        }
    }
  })
  
  // слушатель события на кнопке Очистить всё
  document.querySelector('#buttonToDelete').addEventListener("click", (event) => {
      const countOfRowForDelete = document.querySelectorAll('.row').length
      for(let i = 0; i < countOfRowForDelete; i++){
          document.querySelectorAll('.row')[0].remove()
      }
      addBorderRadiusRightBottomForFirstLine()
  })
  
  // функция, добавляющая блок с введенным словом и транслитерацией
function createElement() {
    const newRow = document.createElement('div')
    newRow.classList.add('row')
    document.querySelector('.dictionary').append(newRow)
    // номер для новой строки
    const numberForNewRow = document.querySelectorAll('.row').length + 1
    // текст из инпута
    const ruTextForNewRow = document.querySelector('input').value.toLowerCase().trim()
    // текст на выходе из функции транслитерации
    const enTextForNewRow = makeTransliteration(ruTextForNewRow)
    // урезанный текст 
    let croppedRuTextForNewRow = ruTextForNewRow
    let croppedEnTextForNewRow = enTextForNewRow
    // переменная для количества строк, используется после добавления новой строки со словами, для добавления title к добавленной строке
    let countOfRow = null
    // если текст длиннее 10 символов, то оставляем 7 символов и добавляем три точки
    if(ruTextForNewRow.length > 10){
        croppedRuTextForNewRow = ruTextForNewRow.slice(0, 7) + '...'
    } 
    if(enTextForNewRow.length > 10){
        croppedEnTextForNewRow = enTextForNewRow.slice(0, 7) + '...'
    }   
    // добавляем в новую строку верстку и значения
    newRow.innerHTML = `<div class="left-half">
                            <div class="number">
                                <span>${numberForNewRow}</span>
                            </div>
                            <div class="ru">
                                <div class="text">
                                    <p>${croppedRuTextForNewRow}</p> 
                                </div>
                            </div>
                        </div>
                        <div class="right-half">
                            <div class="en">
                                <div class="text">
                                    <p>${croppedEnTextForNewRow}</p>
                                </div>
                            </div>
                            <div class="delete">
                                <div class="close"><img id="close" src="SF Symbol.png" alt=""></div>
                            </div>
                        </div>`
    
    // к новой строке добавить айдишник, чтобы по нему потом находить весь элемент для удаления
    newRow.setAttribute('id', `${numberForNewRow}`)
    // слушатель события на новый элемент крестик (кнопка удаления): найти по айдишнику элемент (строку, т.к. другим элементам эти айдишники не даю) и удалить элемент
    let countOfClose = document.querySelectorAll('.close').length
    document.querySelectorAll('.close')[countOfClose-1].addEventListener("click", (event) => {
        document.getElementById(`${numberForNewRow}`).remove()
        if(setNumbers()){
            addBorderRadiusRightBottomForFirstLine()
        }
    })
    // к элементу class="left-half" добавлять title, только для текста длиннее 10 символов, чтобы отображать подсказку 
    if(ruTextForNewRow.length > 10){
        croppedRuTextForNewRow = ruTextForNewRow.slice(0, 7) + '...'
        countOfRow = document.querySelectorAll('.row').length
        document.querySelectorAll(`.row>.left-half`)[countOfRow-1].setAttribute('title', `${ruTextForNewRow}`)
    } 
    // аналогично добавлять title для транслита
    if(enTextForNewRow.length > 10){
        croppedEnTextForNewRow = enTextForNewRow.slice(0, 7) + '...'
        countOfRow = document.querySelectorAll('.row').length
        document.querySelectorAll(`.row>.right-half`)[countOfRow-1].setAttribute('title', `${enTextForNewRow}`)
    }
    // очистить поле ввода 
    document.querySelector('input').value = null
    // убрать скругление первому элементу
    deleteBorderRadiusRightBottomForFirstLine()
}

// функция, добавляющая класс правому элементу(чтобы убирать скругление)
function deleteBorderRadiusRightBottomForFirstLine() {
    document.querySelector('.row-first>.right-half').setAttribute('id','ifFirstRowOnlyOne')
}

// функция, удаляющая класс правому элементу(чтобы вернуть скругление)
function addBorderRadiusRightBottomForFirstLine() {
    document.querySelector('.row-first>.right-half').removeAttribute('id','ifFirstRowOnlyOne')
}

// функция, которая введет номера после удаления строки и если всего элементов 1, то даст знак вернуть скругление true
function setNumbers() {
    let isOnlyOneRow = true
    for (let i = 0; i < document.querySelectorAll('.row').length; i++){
        document.querySelectorAll('.row span')[i].innerText = i + 2
        isOnlyOneRow = false
    }
    return isOnlyOneRow
}

// функция, на входе текст, на выходе транслитерация
function makeTransliteration(ruStr) {
    const alphabetRu = ['1','2','3','4','5','6','7','8','9','0','!','?','-','.',',',' ','а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const alphabetEn = ['1','2','3','4','5','6','7','8','9','0','!','?','-','.',',',' ','a','b','v','g','d','e','e','zh','z','i','i','k','l','m','n','o','p','r','s','t','u','f','kh','ts','ch','sh','sc','"','y',"'",'e','iu','ia','а','б','ц','д','е','ф','г','х','и','ж','к','л','м','н','о','п','к','р','с','т','ю','в','в','кс','и','з']
    let enStr = ''
    for(let i = 0; i < ruStr.length; i++){       
        alphabetEn[alphabetRu.indexOf(ruStr[i])] ? enStr += alphabetEn[alphabetRu.indexOf(ruStr[i])] : ''
    }
    return enStr
}

// функция-проверка, на пустоту строки. Возвращает true если строка пустая или состоит из пробелов
function isEmptyString() {
    let isEmpty = true
    string = document.querySelector('input').value
    for(let i = 0; i < string.length; i ++){
        if(string[i] !== ' '){
            isEmpty = false
        }
    }
    return isEmpty
}