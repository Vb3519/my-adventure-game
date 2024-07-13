let adventureGame = [
    'testValue',
    // Объект с характеристиками персонажа:    
    charInfo = { // принципиально важны названия с маленьких букв, если свойство из нескольких слов то "название_свойства" или "названиеСвойства"
        'nick_name': '',
        'nickName_listed': false,
        health: 40,
        damage: 10, /* укажи урон в переменной */
        exp: 0,
        level: 0,
        gold: 0,
    },

    // Объект с характеристиками врагов:
    enemyInfo = {
        'wild_boar': {
            health: 30,
            damage: 10, /* укажи урон в переменной */
            name: 'Wild Boar',
        },

        blackBrowedBear: {
            health: 100,
            damage: 50, /* укажи урон в переменной */
            name: 'Felwood Giant Bear',
        },

        'dragon_steelwing': {
            health: 250,
            damage: 100, /* укажи урон в переменной */
            name: 'Dragon Steelwing',
        }
    },

    // Объект с данными товаров в магазине города:
    shop = {
        weapons_price: {
            dagger: 50,
            sword: 100,
        },

        health: '10' // просто покупка себе 10хп (счетчик) - добавляется как метод к объекту "charInfo", макс хп 800;
    },

    // Характеристики оружия:
    weaponsDamage = {
        dagger: 20, /* укажи урон в переменной */
        sword: 50,
    }
];


// Функция для поиска каждого объекта (по имени переменной) в массиве игры:
function findObjPos(inputMainGameArr, objName) {
    for (let i = 0; i < inputMainGameArr.length; i++) {
        if (inputMainGameArr[i] == objName) {
           return i;
        }
    }
}

// как мне эту функцию запустить 4 раза и получить индекс каждого объекта сразу?
const charInfoPos = findObjPos(adventureGame, charInfo); // индекс 1
const enemyInfoPos = findObjPos(adventureGame, enemyInfo); // индекс 2
const shopPos = findObjPos(adventureGame, shop); // индекс 3
const weaponsDamagePos = findObjPos(adventureGame, weaponsDamage); // индекс 4

// --------------------- РАБОТА С ОБЪЕКТОМ "charInfo" (adventureGame[1]) --------------------- //
// Добавление имени персонажа в объект "charInfo":
function setCharName() {
    let charNameValue = prompt('Type your character name', '');

    charInfo['nick_name'] = charNameValue;
    charInfo.nickName_listed = true;

    return charInfo;
}

// Добавление метода "health_increase" (покупка хп в магазине города):
// Вариант №1:
function addHealthPoints_Increase() {
    let charInfoObj = adventureGame[charInfoPos]; // подобие функции - конструктора (НЕ используется "new" при вызове)

    charInfoObj.health_increase = function() {
        charInfoObj.health += 10;
        return charInfoObj; // если убрать "return charInfoObj" - не будет работать цепочка вызовов метода объекта
    }

// // Вариант №2 и №3:
// function BuyHP(inputObj) {
//     inputObj.healthIncrease = function() {
//         inputObj.health += 10;
//         return inputObj;
//     }
// }

// // Вариант №3:
// function HealthIncrease() { /* если ее вызывать ч/з "new" с уже существующим объектом (пытаясь добавить ему метод),
//     то у объекта будет появляться свойство - объект с этим методом (это не то, что нужно). Т.е. лучше этим пользоваться, когда объекта вообще нет*/
//     this.healthIncrease = function() {
//         this.health += 10;
//         return this;
//     }
//     // т.е. такой функцией можно написать весь объект "charInfo" игры "adventureGame" (если его изначально нет)
// }
}

// Добавление метода "gold_increase" (получение золота при убийстве монстров):
function addGainGold() {
    let charInfoObj = adventureGame[charInfoPos];

    charInfoObj['gold_increase'] = function() {
        charInfoObj['gold'] += 10;
        return charInfoObj;
    }
}

// Добавление метода "gain_exp_and_levels" (получение опыта при убийстве монстров; и повышение уровня):
function addGainExpAndLevels() {
 let charInfoObj = adventureGame[charInfoPos]

 charInfoObj['gain_exp_and_levels'] = function(){
    if (charInfoObj.exp < 100) {
        charInfoObj.exp += 10;        
        return charInfoObj;
    }

    charInfoObj.exp = 0;
    charInfoObj['level'] += 1;
    charInfoObj.health += 10;
    return charInfoObj;
 }
}

// ------------------- Одна общая функция для указания имени персонажа и добавления всех методов к объекту "charInfo":
function setAllMethodsForcharInfo() {
    addHealthPoints_Increase();
    addGainGold();
    addGainExpAndLevels();
    setCharName();
    return adventureGame[charInfoPos];
}


// Эти две функции, возможно НЕ нужны (написал одну общую):
// Функция №1 (рабочий вариант) сражения игрока с разными врагами (3 типа):
function setPlayerEnemy(playerEnemy) { // сюда ч/з аргумент вызова функции передается враг игрока
    let charInfoObj = adventureGame[charInfoPos]; 
    
    if (playerEnemy == undefined || playerEnemy == null) {
        return `No enemies were found nearby`;
    };

    charInfoObj.health -= playerEnemy['damage']
    if (charInfoObj.health <= 0) {
        charInfoObj.health = 0; // чтобы значение хп не уменьшалось ниже "0";
        return 'YOU DIED!';
    }

    return charInfoObj;    
};
// Функция №2 (много кода, ч/з "switch") сражения игрока с разными врагами (3 типа):
function addHealthLossForPlayer(playerEnemy) {
    let charInfoObj = adventureGame[charInfoPos];    

    if (playerEnemy) { // если есть враг, то мы перебираем врагов (3 варианта)
        switch(playerEnemy) {
            case wild_boar:
                charInfoObj.health -= wild_boar['damage']
                if (charInfoObj.health <= 0) {
                    return 'YOU DIED!'; // Привет Dark Souls ^_^
                }

                return charInfoObj;
                //break;
    
            case blackBrowedBear:
                charInfoObj.health -= blackBrowedBear['damage']
                if (charInfoObj.health <= 0) {
                    return 'YOU DIED!';
                }

                return charInfoObj;
            
            case dragon_steelwing:
                charInfoObj.health -= dragon_steelwing['damage']
                if (charInfoObj.health <= 0) {
                    return 'YOU DIED!';
                }

                return charInfoObj;
        }
    }

    return `No enemies were found nearby`;
}



// --------------------- РАБОТА С ОБЪЕКТОМ "enemyInfo" (adventureGame[2]) --------------------- //

// Функция поиска объекта "wild_boar" в массиве игры (по названию объекта):
function findBoarEnemyObj() {
    let generalEnemyInfoObj = adventureGame[enemyInfoPos]; // объект "enemyInfo" с 3-мя вложенными объектами (каждый враг - отдельный объект со своими свойствами);
    let enemyListArr = Object.keys(generalEnemyInfoObj); // массив - перечень имен всех врагов;
    let boarEnemyObjPos = enemyListArr.indexOf('wild_boar', 0); // По имени врага, нахожу номер его индекса в массиве: "0"

    let enemyBoarObj = Object.values(generalEnemyInfoObj)[boarEnemyObjPos]; 
    return enemyBoarObj;
}

// Объявление переменной "wild_boar" с помощью деструктуризации объекта "enemyInfo" (когда объектов мало):
let {wild_boar} = adventureGame[enemyInfoPos]; // результат: объект "wild_boar" и его свойства ключ: значение
// Два других врага:
let {blackBrowedBear} = adventureGame[enemyInfoPos];
let {dragon_steelwing} = adventureGame[enemyInfoPos];


// Добавление метода fight_health_decrease для объекта "wild_boar" (эта функция, возможно, НЕ нужна):
function addHealthLossForEnemyBoar() {
    let playerDamageValue = adventureGame[charInfoPos].damage;

    wild_boar['fight_health_decrease'] = function() {
        if (wild_boar.health <= 0) {            
            return;
        }
        
        wild_boar.health -= playerDamageValue;
        return wild_boar;
    }
}



// --------------------- ЛОГИКА ПРОЦЕССА БОЯ ИГРОКА С ПРОТИВНИКОМ: --------------------- //
let playerEnemiesList = [wild_boar, blackBrowedBear, dragon_steelwing] // ч/з "indexOf()" найти позицию каждого объекта в "enemyInfo", далее перебрать сами объекты по номеру индекса;
function addGeneralHealthLossForEnemy(inputEnemyList) { // сюда передать, как аргумент, массив объектов из объекта "enemyInfo"
    let playerDamageValue = adventureGame[charInfoPos].damage;

    inputEnemyList.forEach( enemyName => {
        enemyName['fight_health_decrease'] = function() {
            if (enemyName.health <= 0) {
                return;
            }
            
            enemyName.health -= playerDamageValue;
            return enemyName;
        }
    })
}

// Добавление метода уменьшения ХП игрока в зависимости от типа врага (надо убирать этот метод перед каждым новым боем);
function addHealthLossForPlayer(inputPlayerEnemy) {
    let charInfoObj = adventureGame[charInfoPos];
    
    charInfoObj.player_fight_health_decrease = function() {
        if (charInfoObj.health <= 0) {
            return `YOU DIED!`;
        }

        if (charInfoObj.health > 0) {
            charInfoObj.health -= inputPlayerEnemy['damage'];        
            return charInfoObj;
        }
    }
}

// Добавить шанс промаха в логику боя???


function buyWeapon() {
    // нахожу цену на пухи
    // проверяю наличие золота у игрока - если недостаточно, то отмена;
    // если достаточно, то покупка конкретного оружия и увеличение характеристики урона
}








// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------ НАЧАЛО ИГРЫ (СОЗДАНИЕ ПЕРСОНАЖА) ------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //

// Заполнение элемента-списка характеристик персонажа (имя, характеристики):
// Добавить имя персонажа в элемент-список с его характеристиками:
function addCharName() {
    let charNameValue = adventureGame[charInfoPos]['nick_name'];
    let charNameElem = document.querySelector('.char-stats__char-name');
    charNameElem.innerHTML = `
        Your character created: <span>${charNameValue}</span>
    `;
}

// Добавить характеристи созданного персонажа в его элемент-список:
function addNewCharStatsValues() {
    let charStatsElemList = document.querySelectorAll('.stats-list__elem');
    let arr = Array.from(charStatsElemList);
    let i = 0;

    for (; i < arr.length;) {        
        arr[i].innerText = `Health: ${charInfo['health']}`;
        i++;
        break;
    }

    for (; i < arr.length;) {        
        arr[i].innerText = `Damage: ${charInfo['damage']}`;
        i++;
        break;
    }

    for (; i < arr.length;) {        
        arr[i].innerText = `Level: ${charInfo['level']}`;
        i++;
        break;
    }

    for (; i < arr.length;) {        
        arr[i].innerText = `Gold: ${charInfo['gold']}`;
        i++;
        break;
    }
}

// Элемент-список с характеристикми персонажа заполнен:
// Скрыть поле ввода ника персонажа и кнопку создания персонажа:
function hideCreateCharContainer() {
    let createCharContainer = document.querySelector('.game-start-page__create-char');
    createCharContainer.style.display = 'none';
}

// Отображение элемента-списка (ЗАПОЛНЕННОГО) с характеристиками созданного персонажа:
function renderCreatedCharInfoElem() {
    let charStats = document.querySelector('.game-start-page__char-stats');
    charStats.style.display = 'flex';
}

// ОБЩАЯ ФУНКЦИЯ: (создать персонажа: запускаются все вышенаписанные функции)
function createNewCharacter(e) {
    let target = e.target;

    if (!target.classList.contains('create-char-container__btn')) {
        return;
    }

    let nameValue = document.querySelector('.create-char-container__input').value;

    charInfo['nick_name'] = nameValue;

    if (nameValue) {
        charInfo.nickName_listed = true;
    }
    // return charInfo; почему тут НЕ работает "return"?

    if (charInfo.nickName_listed) {
        addCharName(); // добавить имя персонажа
        addNewCharStatsValues(); // Добавить характеристи созданного персонажа
        hideCreateCharContainer(); // Скрыть поле ввода ника и кнопку создания персонажа
        renderCreatedCharInfoElem() // Отрисовать заполненный элемент с характеристиками персонажа
    }
}
document.addEventListener('click', createNewCharacter);



// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
// -------------------------------------------------- НАЧАЛО ИГРЫ (персонаж СОЗДАН, стартовая страница) ------------------------------------------------------ //
// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //


// ------ Отображение первой игровой страницы (начало игры): ------ //
// Начать игру (начать игру можно только, когда создан персонаж):
function startGame(e) {
    let target = e.target;
    if (!target.classList.contains('game-start-page__btn')) {
        return;
    }

    if (!charInfo.nickName_listed) {
        return;
    }

    let startPage = document.querySelector('.game-start-page');
    startPage.style.display = 'none';

    let gameplayPage = document.querySelector('.gameplay-page');
    gameplayPage.style.display = 'flex';
    addCharNameToCharStats(); // отображение имени персонажа
}
document.addEventListener('click', startGame);


// Функции для страницы геймплея:
const showCharStatValuesBtn = document.querySelector('.stats-container__btn');

// Заполнение данных по характеристикам персонажа:
function fillCharStatsValues() {
    let charStatsNodeList = document.querySelectorAll('.stats-values__elem');
    let charStatsElemArr = Array.from(charStatsNodeList);

    let i = 0;

    for (; i < charStatsElemArr.length;) {        
        charStatsElemArr[i].innerText = `Health: ${charInfo['health']}`;
        i++;
        break;
    }

    for (; i < charStatsElemArr.length;) {        
        charStatsElemArr[i].innerText = `Damage: ${charInfo['damage']}`;
        i++;
        break;
    }

    for (; i < charStatsElemArr.length;) {        
        charStatsElemArr[i].innerText = `Level: ${charInfo['level']}`;
        i++;
        break;
    }

    for (; i < charStatsElemArr.length;) {        
        charStatsElemArr[i].innerText = `Gold: ${charInfo['gold']}`;
        i++;
        break;
    }
}

function addCharNameToCharStats() {
    let charNameValue = adventureGame[charInfoPos]['nick_name'];
    let charNameElem = document.querySelector('.stats-container__char-name');
    charNameElem.innerHTML = `
        <span>${charNameValue}</span>
    `;
}

// Отображение характеристик персонажа при клике на кнопку: ////// --------------- надо подумать, как сделать эту функцию компактнее
function showCharStatsValues() {    
    let charStatsValues = document.querySelector('.stats-container__values');
    charStatsValues.classList.toggle('stats-container__values__active');
    fillCharStatsValues();    
}
showCharStatValuesBtn.addEventListener('click', showCharStatsValues);


// ------ Отображение игровой страницы (fight enemies!): ------ //
// скрыть кнопки опций путешествия ("в город", "сражаться с врагами")
function hideTravelBtns() {
    let playerTravelOptionBtns = document.querySelectorAll('.travel-option');
    Array.from(playerTravelOptionBtns).forEach( elem => {
        elem.style.display = 'none';
    });
}

// показать кнопки выбора противника:
function showEnemiesMenu() {
    let enemiesListBtns = document.querySelectorAll('.enemy-type');

    Array.from(enemiesListBtns).forEach( elem => {
        elem.style.display = 'block';
    });

    hideTravelBtns(); // скрыть кнопки опций путешествия ("в город", "сражаться с врагами")

    // рандомная подсказка из массива подсказок, на каждом меню?
    let pageTooltip = document.querySelector('.gameplay-body__descrip');
    pageTooltip.innerHTML = 'Choose your enemy wisely...';
}
const enemiesMenuBtn = document.querySelector('#enemies-menu');
enemiesMenuBtn.addEventListener('click', showEnemiesMenu);


// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------- ПОДГОТОВКА К БОЮ ------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //

// --------------------------------------------------------------- //
// ------------- РАБОТА С ИНТЕРФЕЙСОМ ПОДГОТОВКИ БОЯ ------------- //

// Заполнение значений характеристик врага:
function fillEnemyStatsValues(inputPlayerEnemy) {
    let enemyStatsNodeList = document.querySelectorAll('.enemy-stats-values__elem');
    let enemyStatsElemArr = Array.from(enemyStatsNodeList);

    // отображение характеристик врага (с уже заполненными значениями):
    let enemyStatsElem = document.querySelector('.gameplay-header__enemy-stats');
    enemyStatsElem.style.visibility = 'visible';
    
    let i = 0;
    
    for (; i < enemyStatsElemArr.length;) {        
        enemyStatsElemArr[i].innerText = `Health: ${inputPlayerEnemy['health']}`;
        i++;
        break;
    }
    
    for (; i < enemyStatsElemArr.length;) {        
        enemyStatsElemArr[i].innerText = `Damage: ${inputPlayerEnemy['damage']}`;
        i++;
        break;
    }
}

// Отображение имени выбранного врага:
function showEnemyName(inputPlayerEnemy) {
    let enemyNameElem = document.querySelector('.enemy-stats-container__enemy-name');
    enemyNameElem.innerHTML = inputPlayerEnemy['name'];
}

// Скрываем кнопки отображения выбора варианта врага:
function hideEnemySelectionList() {
    let enemiesListBtns = document.querySelectorAll('.enemy-type');
    Array.from(enemiesListBtns).forEach( elem => {
        elem.style.display = 'none';
    });
}

// Отрисовка кнопок начала процесса боя ("атака" / "бегство"):
function showCombatBtns() {
    let combatOptionsBtns = document.querySelectorAll('.combat-options');
    Array.from(combatOptionsBtns).forEach( btn => {
        btn.style.display = 'block';
    })
}

// Подготовка к бою (открытие списка характеристик персонажа; отрисовка новых кнопок: "атака" / "бегство"; отображение новой подсказки)
function playerPrepForBattle() {
    function showCharStatsValues() {    
        let charStatsValues = document.querySelector('.stats-container__values');
        charStatsValues.classList.toggle('stats-container__values__active');
        fillCharStatsValues();
    }
    showCharStatsValues();
        
    // Отрисовка кнопок боя (бегство, атаковать):    
    showCombatBtns();
        
    // Смена подсказки:
    let pageTooltip = document.querySelector('.gameplay-body__descrip');
    pageTooltip.innerHTML = 'You always have the opportunity to escape before the battle begins, but what about your warrior pride?';
}


// ----------------------------------------------------------------------------------- //
// ------------- РАБОТА С ОБЪЕКТАМИ ИГРОКА И ПРОТИВНИКА (ПОДГОТОВКА БОЯ) ------------- //

// добавление объекту ПЕРСОНАЖА метода убавления хп в бою в соответствии с уровнем атаки выбранного врага:
function addHealthLossForPlayer(inputPlayerEnemy) {
    let charInfoObj = adventureGame[charInfoPos];
            
    charInfoObj.player_fight_health_decrease = function() {
        if (charInfoObj.health <= 0) {
            return `YOU DIED!`;
        }
        
        if (charInfoObj.health > 0) {
            charInfoObj.health -= inputPlayerEnemy['damage'];        
            return charInfoObj;
        }
    }
}

// добавление объекту ПЕРСОНАЖА метода накопления золота (при победе над врагом):
function addGainGold() {
    let charInfoObj = adventureGame[charInfoPos];

    charInfoObj['gold_increase'] = function() {
        charInfoObj['gold'] += 10;
        return charInfoObj;
    }
}

// добавление объекту ПРОТИВНИКА метода убавления хп в бою в соответствии с уровнем атаки персонажа:
function addHealthLossForEnemy(inputPlayerEnemy) {
    let playerDamageValue = adventureGame[charInfoPos].damage;

    inputPlayerEnemy['fight_health_decrease'] = function() {
        if (inputPlayerEnemy.health <= 0) {
            return;
        }
        
        inputPlayerEnemy.health -= playerDamageValue;
        return inputPlayerEnemy;
    }
}
   
// Возврат объекта выбранного игроком врага:
let selectedPlayerEnemy; // ------------------------------- эта переменная передается в некоторые функции при вызове, как аргумент
function returnSelectedEnemyObj(inputPlayerEnemy) {
    selectedPlayerEnemy = inputPlayerEnemy;
    return selectedPlayerEnemy;
}

// Добавляет в объект выбранного игроком противника характеристику стандартного значения ХП врага (для возможности повторного боя с противником);
function addStandardHealthValueToPlayerEnemy() {
    if (!selectedPlayerEnemy) {
        return;
    }

    selectedPlayerEnemy['standardHealthValue'] = selectedPlayerEnemy['health'];
}

/* ОБЩАЯ ФУНКЦИЯ И ВСПОМОГАТЕЛЬНАЯ ФУНКЦИИ перед началом процесса боя): */

// ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ (вызывается в общей):
/* выбор игроком противника, подготовка к бою (отрисовка интерфейса, добавление методов к объектам и т.д.) */
function setupAllOptionsBeforeBattle(battleOptionsAndEnemyType) {
    returnSelectedEnemyObj(battleOptionsAndEnemyType); // возврат объекта выбранного противника (переменная "selectedPlayerEnemy"), используется в др. функциях
    addStandardHealthValueToPlayerEnemy(); // стандартное значение хп (возволяет повторить бой с противником снова);
    addHealthLossForPlayer(battleOptionsAndEnemyType); // добавление метода потери хп к объекту игрока
    addGainGold(); // добавление метода накопления золота к объекту игрока (при победе игрока в бою);
    addHealthLossForEnemy(battleOptionsAndEnemyType) // добавление метода потери хп к объекту врага
    fillEnemyStatsValues(battleOptionsAndEnemyType); // отрисовка характеристик врага
    showEnemyName(battleOptionsAndEnemyType); // отрисовка имени врага
    hideEnemySelectionList(); // скрываем кнопки выбора противника "boar", "bear", "dragon"
    playerPrepForBattle(); // раскрытие характеристик игрока, отрисовка кнопок "Flee" и "Attack!", смена подсказки
}

// ОБЩАЯ ФУНКЦИЯ: по клику на кнопку "enemy-type" ("boar", "bear", "dragon"), игрок выбирает противника (выполняются все функции, указанные во вспомогательной):
function choosePlayerEnemyAndStartFight(e) {
    let target = e.target;
    
    if (! (target.classList.contains('enemy-type')) ) {
        return;
    }
    
    if (target.id === 'boar_enemy') {
        setupAllOptionsBeforeBattle(wild_boar);        
    }
    
    if (target.id === 'bear_enemy') {
        setupAllOptionsBeforeBattle(blackBrowedBear);
    }
    
    if (target.id === 'dragon_enemy') {
        setupAllOptionsBeforeBattle(dragon_steelwing);
    }
}
document.addEventListener('click', choosePlayerEnemyAndStartFight);



// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------- ПРОЦЕСС БОЯ ------------------------------------------------------------------------------ //
// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //

// -------------------------------------- //
// ------------- НАЧАЛО БОЯ ------------- //

// Процесс боя между игроком и выбранным противником:
let attacksCounter = 0;
function playerAndEnemyFightProcess(e) {
    let target = e.target;

    if (target.id !== 'attack-enemy') {
        return;
    }

    let fleeBtn = document.querySelector('#flee-from-enemy'); // после старта боя кнопка возможности побега - дизейблится
    fleeBtn.disabled = true;
    
    playerAttack(selectedPlayerEnemy);

    let attackBtn = document.querySelector('#attack-enemy');
    attackBtn.disabled = true; // после атаки игроком противника, кнопка атаки дизейблится, пока противник не совершит свою атаку

    setTimeout( () => { // атака противника идет ч/з две секунды после атаки игрока
        enemyAttack();
    }, 2000);
}

document.addEventListener('click', playerAndEnemyFightProcess);

// атака игрока:
function playerAttack(inputPlayerEnemy) { // работает по клику все ок
    let enemyHealthElem = document.querySelector('.enemy-health');    

    if (attacksCounter % 2 === 0) {
        inputPlayerEnemy['fight_health_decrease']();
        battleHealthDecreaseAnimation(enemyHealthElem);
        fillEnemyStatsValues(inputPlayerEnemy);       

        attacksCounter++;
        return inputPlayerEnemy;
    }    
}

// атака противника:
function enemyAttack() {
    
    let attackBtn = document.querySelector('#attack-enemy');
    attackBtn.disabled = false; // как проходит атака противника, кнопка атаки для игрока становится доступна

    let playerHealthElem = document.querySelector('.stats-values__elem.char-health'); // передается как аргумент в вызов функции анимации уменьшения хп
    
    let charInfoObj = adventureGame[charInfoPos];

    if (attacksCounter % 2 !== 0) {
        // Проверка хп врага: если у противника нет хп, он не атакует игрока в ответ (даже если идет ход противника)
        if ( isEnemyDead(selectedPlayerEnemy) ) {
            alertAfterBattlePlayerWins();
            attackBtn.disabled = true;

            setTimeout( () => { // ч/з 2 секунды после победы игрока, рендер нового интерфейса
                setupAllOptionsAfterBattle();
            }, 2000);
            
            return;
        }

        charInfoObj.player_fight_health_decrease();
        battleHealthDecreaseAnimation(playerHealthElem);
        fillCharStatsValues();

        // Проверка хп игрока: если хп нет, кнопка атаки дизейблится и выводится сообщение о проигрыше, отрисовывается новый интерфейс
        if ( isPlayerCharacterDead() ) {
            resetGameInterface();
            attackBtn.disabled = true;
        }
        
        attacksCounter++;
        return charInfoObj;
    }
}

// Проверка убит ли противник игрока:
function isEnemyDead(inputPlayerEnemy) {
    if (inputPlayerEnemy.health <= 0) {        
        return true;
    }
}

// При уменьшении количества хп игрока или противника, значение хп подсвечивается (анимация):
function battleHealthDecreaseAnimation(inputPlayerOrEnemy) {    
    inputPlayerOrEnemy.style.color = 'rgb(120 7 7)';
    inputPlayerOrEnemy.style.fontWeight = 'bold';

    setTimeout( () => {
        inputPlayerOrEnemy.style.color = 'black';
        inputPlayerOrEnemy.style.fontWeight = 'normal';
    }, 1000)
}



// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------- ПРОЦЕСС БОЯ ОКОНЧЕН ---------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //

// ----------------------------------------- //
// ------------- ПОБЕДА ИГРОКА ------------- //

// Сообщение о победе игрока (отображается 2 секунды):
function alertAfterBattlePlayerWins() {
    let charNameValue = adventureGame[charInfoPos]['nick_name'];

    // let playerWinAlertElem = document.querySelector('.alert-container__player-in-the-city');
    // playerWinAlertElem.innerHTML = `${charNameValue}: Okay, it was easy...`;

    // if ( isEnemyDead(selectedPlayerEnemy) ) {
    //         playerWinAlertElem.style.visibility = 'visible';
    
    //         setTimeout( () => { // после победы игрока показать сообщение о победе на 3 секунды
    //             playerWinAlertElem.style.visibility = 'hidden';
    //         }, 2000)
    //     }

    let playerWinAlertElem = document.querySelector('.alert-container__player-alert');
    playerWinAlertElem.innerHTML = `${charNameValue}: Okay, it was easy...`;
    
    if ( isEnemyDead(selectedPlayerEnemy) ) {
        playerWinAlertElem.style.visibility = 'visible';

        setTimeout( () => { // после победы игрока показать сообщение о победе на 3 секунды
            playerWinAlertElem.style.visibility = 'hidden';
        }, 2000)
    }
}

// Скрываем кнопки процесса боя:
function hideCombatBtns() {
    let combatOptionsBtns = document.querySelectorAll('.combat-options');
    Array.from(combatOptionsBtns).forEach( btn => {
        btn.style.display = 'none';
    })
}

// Отображение кнопок повтора боя и возвращения в город:
function showPlayerWinFightBtns() {
    let playerWinFightBtns = document.querySelectorAll('.player-win-fight-options');
    Array.from(playerWinFightBtns).forEach( btn => {
        btn.style.display = 'block';
    })
}

// Скрываем элемент с информацией об имени и характеристиках противника:
function hideEnemyNameAndStats() {
    let enemyNameAndStatsElem = document.querySelector('.enemy-stats-container');
    enemyNameAndStatsElem.style.visibility = 'hidden';
}

// Показать новую подсказку:
function showNewTooltip() {
    let pageToolTip = document.querySelector('.gameplay-body__descrip');
    pageToolTip.innerHTML = 'In battles with opponents, you have a chance to get gold and experience';
}

// Добавляем метод к объекту игрока (получение золота: 10 золота за победу над врагом):
function addGoldtoPlayerIfWinFight() {
    let charInfoObj = adventureGame[charInfoPos];
    charInfoObj['gold_increase']();
}

// Отрисовать и обновить все характеристики персонажа (все, кроме ХП):
function refillCharStatsValues() {
    fillCharStatsValues();
}

// ОБЩАЯ ФУНКЦИЯ: ПОБЕДА ИГРОКА (обновить интерфейс, данные объектов и т.д.). Вызываются все функции, кроме отображения сообщения о победе:
// Данная функция вызывается внутри функции "enemyAttack()", т.к. там идет проверка на ХП врага
function setupAllOptionsAfterBattle() {
    if ( !isEnemyDead(selectedPlayerEnemy) ) {
        return;
    }

    if ( isEnemyDead(selectedPlayerEnemy) ) {
        hideCombatBtns(); // скрыть кнопки для процесса сражения (атака, бегство)
        showPlayerWinFightBtns(); // отобразить кнопки вариантов действий игрока (при победе игрока)        
        hideEnemyNameAndStats(); // скрыть характеристики поверженного врага
        showNewTooltip(); // отобразить новую подсказку
        addGoldtoPlayerIfWinFight(); // добавить метод получения золота к объекту персонажа игрока
        refillCharStatsValues(); // перезаполнить и отрисовать новые (если есть) характеристики игрока
    }
};


// ------------------------------------------------------------------------------- //
// ------------- ПОБЕДА ИГРОКА (ИГРОК ВЫБИРАЕТ - ПОВТОРИТЬ СРАЖЕНИЕ) ------------- // 

// Обновляет в объекте врага значение его хп (для повторного боя):
function renewSelectedPlayerEnemyHeatlh(inputPlayerEnemy) { // запускать эту функцию при желани игрока повторить бой или возврате в город (неважно)
    inputPlayerEnemy.health = inputPlayerEnemy['standardHealthValue'];
};

// Обнуляем счетчик атак (для начала повторного боя):
function resetAttacksCounter() {
    attacksCounter = 0;
}

// скрываем кнопки выбора опций игроком (при победе игрока):
function hidePlayerWinFightBtns() {
    let playerWinFightBtns = document.querySelectorAll('.player-win-fight-options');
    Array.from(playerWinFightBtns).forEach( btn => {
        btn.style.display = 'none';
    })
}

// ОБЩАЯ ФУНКЦИЯ: ПОВТОРИТЬ СРАЖЕНИЕ
function repeatFightWithSameEnemy(e) {
    let target = e.target;

    if (target.id != 'fight-again') {
        return;
    }

    renewSelectedPlayerEnemyHeatlh(selectedPlayerEnemy);
    resetAttacksCounter();
    showCombatBtns();
    fillEnemyStatsValues(selectedPlayerEnemy);
    showEnemyName(selectedPlayerEnemy);
    hidePlayerWinFightBtns();

    let attackBtn = document.querySelector('#attack-enemy');
    attackBtn.disabled = false;

    let fleeBtn = document.querySelector('#flee-from-enemy');
    fleeBtn.disabled = false;

}
document.addEventListener('click', repeatFightWithSameEnemy);


// ------------------------------------------------------------------------------ //
// ------------- ПРОИГРЫШ ИГРОКА (проверка и отрисовка интерфейса): ------------- //

// Проверка хп игрока, функция вызывается в функции "enemyAttack()":
function isPlayerCharacterDead() {
    if (charInfo['health'] <= 0) {
        return true;
    }
}

// Показывается сообщение о проигрыше игрока (на 2 секунды):
function alertAfterBattlePlayerLose() {
    let playerLoseAlertElem = document.querySelector('.alert-container__player-alert');
    playerLoseAlertElem.innerHTML = `YOU DIED!`;
    
    if ( isPlayerCharacterDead() ) {
        playerLoseAlertElem.style.visibility = 'visible';

        setTimeout( () => { // после проигрыша игрока показать сообщение о проигрыше на 2 секунды
            playerLoseAlertElem.style.visibility = 'hidden';
            addCharNameWhenPlayerLose();
        }, 2000)
    }
}

// Изменяется имя персонажа:
function addCharNameWhenPlayerLose() {
    let charNameValue = adventureGame[charInfoPos]['nick_name'];
    let charNameElem = document.querySelector('.stats-container__char-name');
    charNameElem.innerHTML = `
        <span>We lost our hero: ${charNameValue}</span>
    `;
}

// Отрисовка кнопки рестарта игры:
function showRestartBtn() {
    let restartBtn = document.querySelector('.restart-btn');
    restartBtn.style.display = 'block';
}

// ОБЩАЯ ФУНКЦИЯ: Проигрыш игрока (отрисовка нового интерфейса)

// Эта функция вызывается в функции "enemyAttack()"
function resetGameInterface() {
    if ( isPlayerCharacterDead() ) {
        alertAfterBattlePlayerLose();
        hideCombatBtns();
        resetAttacksCounter();
        hideEnemyNameAndStats();
        showCharStatsValues();
        showRestartBtn();
    }
}


// -------------------------------------------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------- ПРОИГРЫШ ИГРОКА (РЕСТАРТ ИГРЫ): -------------------------------------------------------- //

// ПОЛНАЯ очистка всех переменных, методов объектов и т.д.:

// --- ФУНКЦИИ ДЛЯ РАБОТЫ С ЭЛЕМЕНТАМИ СТРАНИЦЫ (интерфейс и т.д.): ---

// РЕСТАРТ СТРАНИЦА: скрыть кнопку рестарта игры при клике на нее (ee срабатывании):
function hideRestartBtn() {
    let restartBtn = document.querySelector('.restart-btn');
    restartBtn.style.display = 'none';
}

// СТАРТОВАЯ СТРАНИЦА: отображение на стартовой странице элемента для создания нового персонажа (поле "input" и кнопка "create character"):
function showCreateCharContainer() {
    let createCharContainer = document.querySelector('.game-start-page__create-char');
    createCharContainer.style.display = 'flex';
}

// СТАРТОВАЯ СТРАНИЦА: скрыть элемент - список с именем и характеристиками персонажа:
function hideCreatedCharInfoElem() {
    let charStats = document.querySelector('.game-start-page__char-stats');
    charStats.style.display = 'none';
}

// СТАРТОВАЯ СТРАНИЦА: очистка поля ввода ника персонажа (input):
function resetNickNameInputValue() {
    let charNameInputElem = document.querySelector('.create-char-container__input');
    charNameInputElem.value = '';
}

// ГЕЙМПЛЕЙ СТРАНИЦА: отрисовка кнопок путешествия для старта игры ("в город", "в атаку"):
function showTravelBtns() {
    let playerTravelOptionBtns = document.querySelectorAll('.travel-option');
    Array.from(playerTravelOptionBtns).forEach( elem => {
        elem.style.display = 'block';
    });
}

// СРАЖЕНИЕ СТРАНИЦА: разблокировать кнопки сражения:
function unlockCombatBtns() {
    let combatOptionsBtns = document.querySelectorAll('.combat-options');
    Array.from(combatOptionsBtns).forEach( btn => {
        btn.disabled = false;
    })
}

// --- ФУНКЦИИ ДЛЯ РАБОТЫ С ИГРОВЫМИ ОБЪЕКТАМИ И ПЕРЕМЕННЫМИ: ---

// Ресет имени персонажа:
function resetCharName() {
    charInfo['nick_name'] = '';
    charInfo.nickName_listed = false;

    return charInfo;
}

// Полный ресет всех объектов игры (присваиваю массиву "adventureGame" его изначальные значения):
function resetAdventureGameObjects() {
    adventureGame = [
        'testValue',
        
        charInfo = {
            'nick_name': '',
            'nickName_listed': false,
            health: 40,
            damage: 10,
            exp: 0,
            level: 0,
            gold: 0,
        },    
        
        enemyInfo = {
            'wild_boar': {
                health: 30,
                damage: 10,
                name: 'Wild Boar',
            },
    
            blackBrowedBear: {
                health: 100,
                damage: 50,
                name: 'Felwood Giant Bear',
            },
    
            'dragon_steelwing': {
                health: 250,
                damage: 100,
                name: 'Dragon Steelwing',
            }
        },
    
        shop = {
            weapons_price: {
                dagger: 50,
                sword: 100,
            },
    
            health: '10'
        },    
        
        weaponsDamage = {
            dagger: 20,
            sword: 50,
        }
    ];
}

// Ресет значения переменной "selectedPlayerEnemy":
function resetSelectedPlayerEnemy() {
    selectedPlayerEnemy = '';
}

// Ресет значения переменной "attacksCounter":
function resetAttacksCounter() {
    attacksCounter = 0;
}

// Ресет значений переменных содержащих объекты из "enemyInfo" (объявлены и присвоены значения при помощи деструктуризации):
function resetEnemyObjectVariables() {
    ({wild_boar, blackBrowedBear, dragon_steelwing} = adventureGame[enemyInfoPos]); // при деструктуризации внутри функции нужно все указывать в круглых скобках
}

// ОБЩАЯ ФУНКЦИЯ (РЕСТАРТ ИГРЫ): часть функций отсюда (для работы со страницами игры, возможно, стоит перенести в соответствующие разделы)
function gameRestart(e) {
    let target = e.target;

    if (target.id !== 'restart-game') {
        return;
    }
    
    let startPage = document.querySelector('.game-start-page');
    startPage.style.display = 'flex';

    let gameplayPage = document.querySelector('.gameplay-page');
    gameplayPage.style.display = 'none';

    // Функции для работы с кнопками:
    hideRestartBtn(); // скрыть кнопку рестарта
    showTravelBtns(); // отобразить кнопки для путешествий
    unlockCombatBtns(); // разблокировать кнопки сражения

    // Функции для работы с объектами и переменными:
    resetAdventureGameObjects(); // ресет всех объектов игры
    resetEnemyObjectVariables(); // ресет значений переменных wild_boar; blackBrowedBear; dragon_steelwing
    resetSelectedPlayerEnemy(); // ресет значения выбранного противника
    resetAttacksCounter(); // ресет переменной - количетсва совершенных атак
    resetCharName(); // ресет имени персонажа (возможно можно не использовать)

    // Функции для работы с прочими элементами интерфейса:
    showCreateCharContainer(); // отобразить кнопку "input" и кнопку "create character"
    hideCreatedCharInfoElem(); // скрыть элемент в характеристиками созданного персонажа
    resetNickNameInputValue(); // очистка поля "input"
}
document.addEventListener('click', gameRestart);





// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------- РАБОТАЮ ТУТ (ЗАВЕРШЕНИЕ КОДА) ------------------------------------------------------------ //
// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //


// -------------------------------------------------------------- //
// ------------- БЕГСТВО (игрок сбегает с поля боя) ------------- //
function runForestRun(e) {
    let target = e.target;

    if (target.id !== 'flee-from-enemy') {
        return;
    }

    hideCombatBtns();
    hideEnemyNameAndStats();

    showTravelBtns();
}
document.addEventListener('click', runForestRun);


// -------------------------------------------------------------- //
// ------------- ИГРОК ВЫБИРАЕТ ПОСЕЩЕНИЕ ГОРОДА ---------------- //
function hideCityBtns() {
    let playerCityBtns = document.querySelectorAll('.city-btn');
    Array.from(playerCityBtns).forEach( elem => {
        elem.style.display = 'none';
    });
}

function showCityBtns() {
    let playerCityBtns = document.querySelectorAll('.city-btn');
    Array.from(playerCityBtns).forEach( elem => {
        elem.style.display = 'block';
    });
}

function showCityVisitAlert() {
    let charNameValue = adventureGame[charInfoPos]['nick_name'];

    let cityAlert = document.querySelector('.alert-container__player-alert');
    cityAlert.innerHTML = `
        ${charNameValue}: The first thing i need to do is visit the tavern...
    `;

    setTimeout( () => {
        cityAlert.style.visibility = 'visible';
    }, 2000)

    setTimeout( () => {
        hideCityVisitAlert();
    }, 4000)
}

function hideCityVisitAlert() {
    let cityAlert = document.querySelector('.alert-container__player-alert');
    cityAlert.style.visibility = 'hidden';
}

// Посещение города:
function travelToTheCity(e) {
    let target = e.target;

    if (target.id !== 'travel-to-the-city') {
        return;
    }

    let leaveTheCityBtn = document.querySelector('#leave-city');
    leaveTheCityBtn.disabled = true;
    
    setTimeout( () => {
        leaveTheCityBtn.disabled = false;
    }, 2000) // антиспам для кнопки (переключение между посетить город / покинуть город игроком)
    
    hideTravelBtns();
    showCityBtns();
    showCityVisitAlert();
    // функция отображения подсказки
}
document.addEventListener('click', travelToTheCity);

/////////
// Покинуть город:
function leaveTheCity(e) {
    let target = e.target;

    if (target.id !== 'leave-city') {
        return;
    }

    showTravelBtns();
    hideCityBtns();
    hideCityVisitAlert();
    // функция отображения подсказки
}
document.addEventListener('click', leaveTheCity);

/////////////////// ДОБАВЬ ПРИ ПОСЕЩЕНИИ ГОРОДА ВОССТАНОВЛЕНИЕ ХП ИГРОКА


//////
// Посещение городского магазина:
function visitMagicStore(e) {
    let target = e.target;

    if (target.id !== 'magic-store') {
        return;
    }

    renderStoreWindow();
    hideVisitStoreBtn();

    // отобразить кнопки покупки напротив каждого оружия (два оружия, две кнопки); секретное оружие, которое можно купить за хп (сделать тултип - "подумай дважды")
    // покупка хп; 10хп - 10 золота
    // секретное оружие уже нельзя купить после первого боя с врагом
    // отобразить кнопку возможности покинуть город
    // если у игрока недостаточно золота - кнопка покупки оружия будет задизейблена (всегда доступна только кнопка покупки орижя за хп);
    // после покупки любого оружия за голд кнопка покупки также дизейблится
    // после покупки оружия за хп, магазин становится не доступен вовсе
}

document.addEventListener('click', visitMagicStore);

function renderStoreWindow() {    
    let cityStoreElem = document.querySelector('.gameplay-body__city-store');
    cityStoreElem.style.visibility = 'visible';
}

function hideStoreWindow() {
    let cityStoreElem = document.querySelector('.gameplay-body__city-store');
    cityStoreElem.style.visibility = 'hidden';
}

function hideVisitStoreBtn() {
    let visitStoreBtn = document.querySelector('#magic-store');
    visitStoreBtn.style.display = 'none';
}

// Уход из городского магазина:
function leaveMagicStore(e) {
    let target = e.target;

    if (target.id !== 'leave-city') {
        return;
    }

    hideStoreWindow();
}

document.addEventListener ('click', leaveMagicStore);


// Функция, которая висит на кнопке "travel-to-the-city", отображает кнопки "Visit the store" и "leave the city" (дизейбли эту кнопку на секунду после отображения) - чтоб не спамили;
// Тут функция висит на кнопке "leave-city"; и после переключения с этих двух кнопок на кнопки "Travel to the city" и "fight enemies", дизейбли на секунду первую кнопку
// Убери при посещении магазина подсказку - освободит место



// Разберись с "toggle" (переключатель отображения характеристик персонажа), иногда он скрыт на старте файта - а должен отображаться


// Напиши функцию отображения рандомной подсказки из двух массивов (мирные подсказки и подсказки во время боя);

// Если игрок проиграл:
// Кнопка начать заново -> стартовое меню и создание нового персонажа

// Если игрок решил отправиться в город:
// ХП игрока восстанавливается
// Меню магазина (два типа оружия на выбор и увеличение ХП)




/* Вопросы:
- Первый: 
    Как перебрать массив объектов всей игры "adventureGame", если при использовании функции "addCharInfoToGameArr()" или любой похожей, где в массие игры объект
    ищется по имени, после изменения он переименовывается (и его не найти при повтрном использовании функции). И нужно ли его вообще искать, если мы изначально
    определяем его индекс.
- Второй:
    Напиши эту игру ч/з функции - конструкторы (вызов с помощью оператора "new"), когда объектов игры изначально нет
- Третий:
    Как переписать функцию "playerAndEnemyFight()" боя игрока с противником из одной большой в несколько маленьких (не удается правильно возвращать нужные значения).
- Четвертый:
    Подумай, как компактнее написать код функции "fillCharStatsInfoElements()". Заполняет несколько элементов "li" информацией о характеристиках персонажа
- Пятый:
    Как сохранять объект (например, для рестарта игры), не мутировать его. Создавать резервную копию и работать с ней, а оригинал не трогать?
*/


/* Когда применяются подобные большие функции? Общая функция добавления имени персонажа в массив игры
(не мутирует объект "charInfo", но добавляет в массив "adventureGame" другой объект, содеружащий ту же информацию, что и "charInfo"): */
function addCharInfoToGameArr() {
    // запрос имени игрока:
    function charNameRequest() { // char - character (персонаж)
        let charNameValue = prompt('Please type your character name', '');
        return charNameValue;
    }

    let charName = charNameRequest();
    // Поиск номера индекса нужного объекта
    // function findGameObjPos(adventureGame, arrElemName) {
    //     let pos = adventureGame.indexOf(arrElemName, 0); // перебирает весь массив игровых объектов и возвращает номер индекса нужного объекта
    //     return pos;
    // }
    // let charInfoPos = findGameObjPos(adventureGame, charInfo);
    let charInfoPos = 1; // если указать так, то все работает (потому что по имени не ищет переменную, после внесения изменений)

    let charInfoObj = adventureGame[charInfoPos]; // нашли сам объект с инфой по персонажу
    let charInfoArr = Object.entries(charInfoObj); // перевели данные этого объекта в массив [ключ, значение]
    
    // Добавление информации по имени персонажа в массив [ключ, значение], полученный из объекта "charInfo":
    function addCharNameToCharInfoObj() {
        let updCharInfoArr = charInfoArr.map( ([key, value]) => {
            if ( key.includes('nick_name') ) {
                return [key, value = charName];
            }

            // или так:
            // if ( key === 'Nick-name' ) {
            //     return [key, value = charName];
            // }
    
            if ( key.includes('nickName_listed') && value == false) {
                return [key, value = true];
            }
    
            return [key, value];
        })

        return updCharInfoArr;
    }

    let updcharInfoArr = addCharNameToCharInfoObj();
    
    // Конвертация массива [ключ, значение] обратно в объект;
    let updCharInfoObj = Object.fromEntries(updcharInfoArr);
   
    // Добавление данные об имени персонажа в общий объект игры:
    adventureGame[charInfoPos] = updCharInfoObj;    

    return adventureGame;
}