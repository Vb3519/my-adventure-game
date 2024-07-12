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


// Эти две функции, возможно НЕ нужны 9написал одну общую):
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
const {wild_boar} = adventureGame[enemyInfoPos]; // результат: объект "wild_boar" и его свойства ключ: значение
// Два других врага:
const {blackBrowedBear} = adventureGame[enemyInfoPos];
const {dragon_steelwing} = adventureGame[enemyInfoPos];


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


// --------------------------------------------------------------------------------- //
// --------------------- РАБОТА С ИНТЕРФЕЙСОМ И ОБЪЕКТАМИ ИГРЫ --------------------- //

// ------ Стартовая страница (создание персонажа): ------ //
// Отобразить таблицу с характеристиками созданного персонажа:
function renderCreatedCharInfo() {
    let charStats = document.querySelector('.game-start-page__char-stats');
    charStats.style.display = 'flex';
}

// Добавить имя созданного персонажа к таблице с его характеристиками:
function addCharName() {
    let charNameValue = adventureGame[charInfoPos]['nick_name'];
    let charNameElem = document.querySelector('.char-stats__char-name');
    charNameElem.innerHTML = `
        Your character created: <span>${charNameValue}</span>
    `;
}

// Скрыть поле ввода ника персонажа и кнопку создания персонажа:
function hideCreateCharContainer() {
    let createCharContainer = document.querySelector('.game-start-page__create-char');
    createCharContainer.style.display = 'none';
}

// Отрисовка всех стартовых характеристик созданного персонажа: ////// --------------- надо подумать, как сделать эту функцию компактнее
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

// Общая функция (создать персонажа):
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
        renderCreatedCharInfo(); // отображение стартовых характеристик созданного персонажа
        addCharName(); // добавление имени персонажа
        hideCreateCharContainer(); // скрыть поле ввода имени и кнопку создания персонажа
        addNewCharStatsValues(); // заполнить информацию по характеристикам созданного персонажа
    }
}
document.addEventListener('click', createNewCharacter);


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

function showEnemiesMenu() {
    let enemiesListBtns = document.querySelectorAll('.enemy-type');

    Array.from(enemiesListBtns).forEach( elem => {
        elem.style.display = 'block';
    });

    let playerTravelOptionBtns = document.querySelectorAll('.travel-option');
    Array.from(playerTravelOptionBtns).forEach( elem => {
        elem.style.display = 'none';
    });

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

/* ОБЩАЯ ФУНКЦИЯ И ВСПОМОГАТЕЛЬНАЯ ФУКНЦИИ перед началом процесса боя): */

// ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ (вызывается в общей):
/* выбор игроком противника, подготовка к бою (отрисовка интерфейса, добавление методов к объектам и т.д.) */
function setupAllOptionsBeforeBattle(battleOptionsAndEnemyType) {
    returnSelectedEnemyObj(battleOptionsAndEnemyType); // возврат объекта выбранного противника (переменная "selectedPlayerEnemy"), используется в др. функциях
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
function enemyAttack() { // все работает, но эта функция не должна вызываться, когда ХП противника меньше 0
    
    let attackBtn = document.querySelector('#attack-enemy');
    attackBtn.disabled = false; // как проходит атака противника, кнопка атаки для игрока становится доступна

    let playerHealthElem = document.querySelector('.stats-values__elem.char-health'); // передается как аргумент в вызов функции анимации уменьшения хп
    
    let charInfoObj = adventureGame[charInfoPos];

    if (attacksCounter % 2 !== 0) {
        // Проверка хп врага: если у противника нет хп, он не атакует игрока в ответ (даже если идет ход противника)
        if ( isEnemyDead(selectedPlayerEnemy) ) {            
            return;
        }

        charInfoObj.player_fight_health_decrease();
        battleHealthDecreaseAnimation(playerHealthElem);
        fillCharStatsValues();        
        
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



// Файт закончился победой игрока:
// Скрыть кнопки flee и attack,
// Скрыть характеристики и имя врага
// насыпать 10 голды игроку
// Отрисовка сообщения - победа игрока (на 2 секунды)
// Далее отрисовка кнопок "back to the city" и "start again" (хп игрока при повторном сражении не восстанавливаются - только при посещении города)


// сообщение о победе игрока (на 2 секунды):
function alertAfterBattlePlayerWins() {
    let plaerWinAlertElem = document.querySelector('.alert-container__player-win');    
    
    if ( isEnemyDead(selectedPlayerEnemy) ) {
        plaerWinAlertElem.style.visibility = 'visible';

        setTimeout( () => {
            plaerWinAlertElem.style.visibility = 'hidden';
        }, 2000)
    }
}

// скрытие кнопок комбата:
function hideCombatBtns() {
    let combatOptionsBtns = document.querySelectorAll('.combat-options');
    Array.from(combatOptionsBtns).forEach( btn => {
        btn.style.display = 'none';
    })
}

// отображение кнопок повтора боя и возвращения в город:
function showPlayerWinFightBtns() {
    let playerWinFightBtns = document.querySelectorAll('.player-win-fight-options');
    Array.from(playerWinFightBtns).forEach( btn => {
        btn.style.display = 'block';
    })
}

// скрыть элемент с информацией об имени и характеристиках противника:
function hideEnemyNameAndStats() {
    let enemyNameAndStatsElem = document.querySelector('.enemy-stats-container');
    enemyNameAndStatsElem.style.visibility = 'hidden';
}

// Показать новую подсказку:
function showNewTooltip() {
    let pageToolTip = document.querySelector('.gameplay-body__descrip');
    pageToolTip.innerHTML = 'In battles with opponents, you have a chance to get gold and experience';
}

// Насыпать объекту игрока 10 голды:
function addGoldtoPlayerIfWinFight() {
    let charInfoObj = adventureGame[charInfoPos];
    charInfoObj['gold_increase']();
}

// Обновить все характеристики персонажа:
function refillCharStatsValues() {
    fillCharStatsValues();
}


function setupAllOptionsAfterBattle() {
    if ( isEnemyDead(selectedPlayerEnemy) ) {
        hideCombatBtns();
        showPlayerWinFightBtns();
        alertAfterBattlePlayerWins();
        hideEnemyNameAndStats();
        showNewTooltip();
        addGoldtoPlayerIfWinFight();
        refillCharStatsValues();
    }    
}

// Если игрок клацает fight-again:
// Обновить все характеристики врага (сделать полными снова):
// После боя объект поверженного врага пустой, нужно обновить его начальные характеристики и снова их отрисовать (а для игрока хп не обновлять)
// Обновлять attacksCounter = 0; (перед каждым боем)
// selectedPlayerEnemy обновится автоматически с обновленим хп объекта; задай "defaultHealthValue" такое же как хп и бери значение из него;


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