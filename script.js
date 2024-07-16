let adventureGame = [
    'testValue',
    // Объект с характеристиками персонажа:    
    charInfo = { // принципиально важны названия с маленьких букв, если свойство из нескольких слов то "название_свойства" или "названиеСвойства"
        'nick_name': '',
        'nickName_listed': false,
        health: 40,
        current_max_hp_value: 40,
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

        health_price: 10 // просто покупка себе 10хп (счетчик) - добавляется как метод к объекту "charInfo", макс хп 800;
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
// Вариант №1:health_increase
function addHealthPoints_Increase() {
    let charInfoObj = adventureGame[charInfoPos]; // подобие функции - конструктора (НЕ используется "new" при вызове)

    charInfoObj.health_increase = function() {
        charInfoObj.health += 20;
        charInfoObj.current_max_hp_value += 20;
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

    charInfoObj['gold_increase'] = function(selectedPlayerEnemy) {
        if (!selectedPlayerEnemy) {
            return;
        }
        
        if (selectedPlayerEnemy === wild_boar) {
            charInfoObj['gold'] += 10;
            return charInfoObj;
        }

        if (selectedPlayerEnemy === blackBrowedBear) {
            charInfoObj['gold'] += 20;
            return charInfoObj;
        }
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
        arr[i].innerText = `Gold: ${charInfo['gold']}`;
        i++;
        break;
    }
}

// Элемент-список с характеристиками персонажа заполнен - скрыть поле ввода ника персонажа и кнопку создания персонажа:
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
        addHealthPoints_Increase(); // добавить метод увеличения хп персонажа (покупка хп в магазине города)
        addMethodBuyWeapon(); // добавить метод покупки оружия в городе (увеличение урона персонажа)
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

// --------------------------------------------------------------- //
// ------------- ОТОБРАЖЕНИЕ ПЕРВОЙ ИГРОВОЙ СТРАНИЦЫ ------------- //

// Добавление имени персонажа к его характеристикам:
function addCharNameToCharStats() {
    let charNameValue = adventureGame[charInfoPos]['nick_name'];
    let charNameElem = document.querySelector('.stats-container__char-name');
    charNameElem.innerHTML = `
        <span>${charNameValue}</span>
    `;
}

// Заполнение значений характеристик персонажа:
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
        charStatsElemArr[i].innerText = `Gold: ${charInfo['gold']}`;
        i++;
        break;
    }
}

// Начать игру (это возможно только когда создан персонаж):
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
    fillCharStatsValues(); // заполнить характеристики персонажа
    addCharNameToCharStats(); // добавить имя персонажа к его характеристикам
    showRandomTooltips(cityTooltips); // отображение рандомных игровых подсказок (в зависимости от типа интерфейса ("городской" / "сражение"))
}
document.addEventListener('click', startGame);

// Развернуть / свернуть характеристики персонажа (при клике на кнопку); По умолчанию всегда они открыты:
function showCharStatsValues() {    
    let charStatsValues = document.querySelector('.stats-container__values');

    charStatsValues.classList.toggle('stats-container__values__hidden');
    fillCharStatsValues();
}

// Кнопка для того чтобы раскрыть / свернуть характеристики персонажа:
const showCharStatValuesBtn = document.querySelector('.stats-container__btn');
showCharStatValuesBtn.addEventListener('click', showCharStatsValues);


// --------------------------------------------------------------------------- //
// ------------- ОТОБРАЖЕНИЕ ИГРОВОЙ СТРАНИЦЫ ("fight enemies!") ------------- //
// Игрок сразу выбрал сражение с врагами:

// Скрыть кнопки опций путешествия ("в город", "сражаться с врагами")
function hideTravelBtns() {
    let playerTravelOptionBtns = document.querySelectorAll('.travel-option');
    Array.from(playerTravelOptionBtns).forEach( elem => {
        elem.style.display = 'none';
    });
}

// Показать кнопки выбора противника:
function showEnemiesMenu() {
    let enemiesListBtns = document.querySelectorAll('.enemy-type');

    Array.from(enemiesListBtns).forEach( elem => {
        elem.style.display = 'block';
    });

    hideTravelBtns(); // скрыть кнопки опций путешествия ("в город", "сражаться с врагами")

    
    showRandomTooltips(combatTooltips); // отображение случайной подсказки (строки 443, 483)
    // let pageTooltip = document.querySelector('.gameplay-body__descrip');
    // pageTooltip.innerHTML = 'Choose your enemy wisely...';
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

// Подготовка к бою (обновление данных по характеристикам персонажа; отрисовка новых кнопок: "атака" / "бегство"; отображение новой подсказки)
function playerPrepForBattle() {
    
    fillCharStatsValues(); // Заполнение значений характеристик персонажа        
    
    showCombatBtns(); // Отрисовка кнопок боя ("бегство", "атаковать")
        
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

    charInfoObj['gold_increase'] = function(selectedPlayerEnemy) {
        if (!selectedPlayerEnemy) {
            return;
        }
        
        if (selectedPlayerEnemy === wild_boar) {
            charInfoObj['gold'] += 10;
            return charInfoObj;
        }

        if (selectedPlayerEnemy === blackBrowedBear) {
            charInfoObj['gold'] += 20;
            return charInfoObj;
        }
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

        let dragonBtn = document.querySelector('#dragon_enemy');
        dragonBtn.setAttribute('data-game-final', 'dragon-dead');
    }
    showRandomTooltips(combatTooltips); // отображение случайной подсказки (строки 443, 483, 662)

}
document.addEventListener('click', choosePlayerEnemyAndStartFight);



// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------- ПРОЦЕСС БОЯ ------------------------------------------------------------------------------ //
// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //


// ------------------------------------------------------------------------------- //
// --------------------- ШАНС ПРОМАХА (игрока по противнику) В БОЮ --------------- //

// Генерация рандомного числа (диапазон от 1 до 4) для определения шанса промаха (25%):
function returnRandomNumberForMissChance() {
    let missChanceValue = Math.floor(Math.random() * (5 - 1) + 1); // сгенерированное число НЕ менее (и может быть равно min) и НЕ более и != max (т.е. диапазон от 1 до 4)
    return missChanceValue; // шанс промаха 25%;
}

// Функция шанса промаха игрока по врагу (вызывается внутри функции "playerAttack()" ):
function combatPlayerMissChance(inputPlayerEnemy, enemyHealthElem) {
    if (returnRandomNumberForMissChance() <= 1) { // если сгенерировано  число 1 - это промах;

        alertPlayerAttackMiss(); // обхявление о промахе игрока
        battlePlayerAttackMissAnimation(enemyHealthElem); // анимация промаха игрока
        fillEnemyStatsValues(inputPlayerEnemy); // перезаполнить характеристики врага

        attacksCounter++;
        return inputPlayerEnemy;

    } else {
        inputPlayerEnemy['fight_health_decrease']();
        battleHealthDecreaseAnimation(enemyHealthElem);
        fillEnemyStatsValues(inputPlayerEnemy);

        attacksCounter++;
        return inputPlayerEnemy;
    }
};

function randomCharacterAlerts(inputAlertsArr) {
    let alertNumber= Math.floor(Math.random() * (3 - 0 + 1) + 0); // максимум и минимум включительно   

    let alertElem = document.querySelector('.alert-container__player-alert');
    alertElem.innerHTML = `
        ${adventureGame[1].nick_name}: ${inputAlertsArr[alertNumber]}
    `;

    alertElem.style.visibility = 'visible';
}

// Объявление о промахе атаки игрока:
function alertPlayerAttackMiss() {   
    
    randomCharacterAlerts(missAlerts); // реплики персонажа в зависимости от его местоположения

    let playerMissAlertElem = document.querySelector('.alert-container__player-alert');
    setTimeout( () => {
        playerMissAlertElem.style.visibility = 'hidden'
    }, 1000) // через 1 секунду скрывает сообщение о промахе персонажа
}

// Анимация промаха атаки игрока:
function battlePlayerAttackMissAnimation(inputPlayerOrEnemy) {    
    inputPlayerOrEnemy.style.color = 'black';
    inputPlayerOrEnemy.style.fontWeight = 'bold';

    setTimeout( () => {
        inputPlayerOrEnemy.style.color = 'black';
        inputPlayerOrEnemy.style.fontWeight = 'normal';
    }, 1000)
}

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
        combatPlayerMissChance(inputPlayerEnemy, enemyHealthElem); // функция боя с генерацией шанса промаха (25%)
        endOfTheGamePlayerWins();
        
        // inputPlayerEnemy['fight_health_decrease']();
        // battleHealthDecreaseAnimation(enemyHealthElem);
        // fillEnemyStatsValues(inputPlayerEnemy);

        // attacksCounter++;
        // return inputPlayerEnemy;
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

    let dragonBtn = document.querySelector('#dragon_enemy');

    if (!(dragonBtn.dataset.gameFinal === 'dragon-dead')) {
        randomCharacterAlerts(battleAlerts);
    } // реплики персонажа в зависимости от его местоположения (строки 701, 846,)

    let playerWinAlertElem = document.querySelector('.alert-container__player-alert');

    if (playerWinAlertElem == null) {
        return;
    }

    if ( isEnemyDead(selectedPlayerEnemy) ) {
        playerWinAlertElem.style.visibility = 'visible';

        setTimeout( () => { // после победы игрока показать сообщение о победе на 3 секунды
            playerWinAlertElem.style.visibility = 'hidden';
        }, 3000)
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

// Добавляем метод к объекту игрока (получение золота: 10 или 20 золота за победу над врагом):
function addGoldtoPlayerIfWinFight() {
    let charInfoObj = adventureGame[charInfoPos];
    charInfoObj['gold_increase'](selectedPlayerEnemy);
}

// Отрисовать и обновить все характеристики персонажа (все, кроме ХП):
function refillCharStatsValues() {
    fillCharStatsValues();
}

// ОБЩАЯ ФУНКЦИЯ: ПОБЕДА ИГРОКА (обновить интерфейс, данные объектов и т.д.). Вызываются все функции, кроме отображения сообщения о победе:
// Данная функция вызывается внутри функции "enemyAttack()", т.к. там идет проверка на ХП врага
function setupAllOptionsAfterBattle() {
    let dragonBtn = document.querySelector('#dragon_enemy');

    if ( !isEnemyDead(selectedPlayerEnemy) || (dragonBtn.dataset.gameFinal === 'dragon-dead') ) {
        return;
    }

    if ( isEnemyDead(selectedPlayerEnemy) ) {
        hideCombatBtns(); // скрыть кнопки для процесса сражения (атака, бегство)
        showPlayerWinFightBtns(); // отобразить кнопки вариантов действий игрока (при победе игрока)        
        hideEnemyNameAndStats(); // скрыть характеристики поверженного врага
        showRandomTooltips(combatTooltips); // отобразить новую подсказку
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
    showRandomTooltips(combatTooltips); // отображение случайной подсказки (строки 443, 483, 662, 953)

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

// Показывается сообщение о проигрыше игрока (можно убрать вручную по клику):
function alertAfterBattlePlayerLose() {
    let playerLoseAlertElem = document.querySelector('.alert-container__player-alert');
    playerLoseAlertElem.innerHTML = `YOU DIED! <br> Thank you Dark Souls...`;
    
    if ( isPlayerCharacterDead() ) {
        playerLoseAlertElem.style.visibility = 'visible';

        setTimeout( () => {
            addCharNameWhenPlayerLose(); // при проигрыше игрока - изменяет ник персонажа на сообщение
        }, 2000)
    }
}

// Возможность для игрока вручную (по клику) убрать сообщение о поражении:
function manuallyHideAlertPlayerLose (e) {
    let target = e.target;

    if (target.id !== 'game-alert') {
        return;
    }

    target.style.visibility = 'hidden';
}
document.addEventListener('click', manuallyHideAlertPlayerLose);

// Скрыть сообщение о поражении игрока автоматически (при рестарте игры):
function automaticallyHideAlertElem() {
    let alertElem = document.querySelector('.alert-container__player-alert');   

    alertElem.style.visibility = 'hidden';
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
            current_max_hp_value: 40,
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
    
            health_price: 10
        },    
        
        weaponsDamage = {
            dagger: 20,
            sword: 50,
        }
    ];
}

// Ресет значения переменной "selectedWeapon":
function resetSelectedWeaponValue() {
    selectedWeapon = '';
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

    let dragonBtn = document.querySelector('#dragon_enemy');
    dragonBtn.removeAttribute('data-game-final');     

    // Функции для работы с кнопками:
    hideRestartBtn(); // скрыть кнопку рестарта
    showTravelBtns(); // отобразить кнопки для путешествий
    unlockCombatBtns(); // разблокировать кнопки сражения

    // Функции для работы с объектами и переменными:
    resetAdventureGameObjects(); // ресет всех объектов игры
    resetEnemyObjectVariables(); // ресет значений переменных wild_boar; blackBrowedBear; dragon_steelwing
    resetSelectedPlayerEnemy(); // ресет значения выбранного противника
    resetAttacksCounter(); // ресет переменной - количества совершенных атак
    resetSelectedWeaponValue(); // ресет переменной - выбранного для покупки оружия
    resetCharName(); // ресет имени персонажа (возможно можно не использовать)

    // Функции для работы с прочими элементами интерфейса:
    automaticallyHideAlertElem(); // скрыть сообщение о проигрыше игрока (если игрок не убрал его вручную)
    showCreateCharContainer(); // отобразить кнопку "input" и кнопку "create character"
    hideCreatedCharInfoElem(); // скрыть элемент в характеристиками созданного персонажа
    resetNickNameInputValue(); // очистка поля "input"

    // Городской магазин:
    showSecretWeapElem(); // отобразить секретное орежие в городе (при рестарте). По умолчанию доступно только при первом посещении города (до боя с врагом).
    showDaggerInSecretShop(); // отобразить даггер (при рестарте), если было куплено секретное оружие
    showSwordinSecretShop(); // отобразить меч (при рестарте)
}
document.addEventListener('click', gameRestart);





// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------- РАБОТАЮ ТУТ (ЗАВЕРШЕНИЕ КОДА) ------------------------------------------------------------ //
// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //


// -------------------------------------------------------------- //
// ------------- БЕГСТВО (игрок сбегает с поля боя) ------------- //
// -------------------------------------------------------------- //

// Общая функция (бегство):
function runForestRun(e) {
    let target = e.target;

    if (target.id !== 'flee-from-enemy') {
        return;
    }

    hideCombatBtns(); // скрыть кнопки боя
    hideEnemyNameAndStats(); // скрыть характеристики врага

    showTravelBtns(); // показать кнопки перемещения персонажа
}
document.addEventListener('click', runForestRun);

// ---------------------------------------------------------------------------------------- //
// ------------- ВЕРНУТЬСЯ В ГОРОД (игрок после боя решает вернуться в город) ------------- //
// ---------------------------------------------------------------------------------------- //

// Восстановление здоровья игрока, при посещении города (вызывается внутри функции "healthRegenInCityAnimation"):
function playerHealthRegenInCity() {
    let playerCurrentMaxHealth = adventureGame[charInfoPos].current_max_hp_value;

    adventureGame[charInfoPos].health = playerCurrentMaxHealth;
    fillCharStatsValues(); // заполнение значений характеристик персонажа (обновление их после боя, при посещении города)
}

// Анимация восстановления здоровья персонажа в городе:
function healthRegenInCityAnimation() {
    let playerCurrentMaxHealth = adventureGame[charInfoPos].current_max_hp_value;
    let playerHealth = adventureGame[charInfoPos].health;

    if (playerHealth === playerCurrentMaxHealth) { // проверка: если у персонажа полное хп - анимации не будет
        return;
    }

    let playerHealthElem = document.querySelector('.stats-values__elem.char-health');
    
    playerHealthElem.style.color = 'rgb(0 69 3)'; // изменение цвета элемента хп на зеленый и выделение его жирным шрифтом
    playerHealthElem.style.fontWeight = 'bold';

    setTimeout( () => {
        playerHealthRegenInCity(); // перезаполнение значений характеристик персонажа
    }, 500)


    setTimeout( () => {        
        playerHealthElem.style.color = 'black'; // возвращение цвета элемента и шрифта в обычное состояние
        playerHealthElem.style.fontWeight = 'normal';        
    }, 2000)
}

// Если игрок посещает город впервые только после боя с врагом (секретное оружие в магазине города - недоступно):
function hideSecretWeapElem() {
    let secretWeapElem = document.querySelector('.city-store-container__item.secret-container');
    if (adventureGame[charInfoPos].health > 40 || adventureGame[charInfoPos].health < 40) {
        secretWeapElem.style.display = 'none';
    }
}

// Отобразить секретное оружие в магазине города:
function showSecretWeapElem() {
    let secretWeapElem = document.querySelector('.city-store-container__item.secret-container');
    secretWeapElem.style.display = 'flex';
}

// ОБЩАЯ ФУНКЦИЯ (вернуться в город после боя):
function homeSweetHome(e) {
    let target = e.target;

    if (target.id !== 'return-to-the-city') {
        return;
    }

    hideSecretWeapElem(); // скрыть секретное оружие в магазине города

    showRandomTooltips(cityTooltips); // отображение случайной подсказки (строки 443, 483, 662, 953, 1293)
    renewSelectedPlayerEnemyHeatlh(selectedPlayerEnemy); // обновить хп поверженного врага
    hidePlayerWinFightBtns(); // скрыть кнопки победы игрока
    unlockCombatBtns(); // раздизейблить кнопки сражения
    resetSelectedPlayerEnemy(); // ресет переменной, содержащей значение выбранного врага
    resetAttacksCounter(); // ресет переменной - количества атак

    showCityVisitAlert(); // показать сообщение при посещении города
    showCityBtns(); // отобразить кнопки интерефейса, когда персонаж в городе
    healthRegenInCityAnimation(); // восстановление здоровья персонажа, при посещении города

}
document.addEventListener('click', homeSweetHome);


// ----------------------------------------------------------------------------------------- //
// ------------- ИГРОК (в интерфейсе начала игры) ВЫБИРАЕТ ПОСЕЩЕНИЕ ГОРОДА ---------------- //
// ----------------------------------------------------------------------------------------- //

// Скрыть кнопки "посещение магазина" и "покинуть город":
function hideCityBtns() {
    let playerCityBtns = document.querySelectorAll('.city-btn');
    Array.from(playerCityBtns).forEach( elem => {
        elem.style.display = 'none';
    });
}

// Отобразить кнопки "посещение магазина" и "покинуть город":
function showCityBtns() {
    let playerCityBtns = document.querySelectorAll('.city-btn');
    Array.from(playerCityBtns).forEach( elem => {
        elem.style.display = 'block';
    });
}

// Показать сообщение при посещении города:
function showCityVisitAlert() {

    randomCharacterAlerts(cityAlerts); // реплики персонажа в зависимости от его местоположения (строки 701, 846, 1328)
    let cityAlert = document.querySelector('.alert-container__player-alert');

    setTimeout( () => {
        cityAlert.style.visibility = 'visible';
    }, 1000) // через 1 секунду отображает сообщение персонажа о посещении города

    setTimeout( () => {
        hideCityVisitAlert();
    }, 7000) // через 7 секунд сообщение о посещении города скрывается (либо игрок может убрать его самостоятельно по клику)
}

// Скрыть сообщение при посещении города:
function hideCityVisitAlert() {
    let cityAlert = document.querySelector('.alert-container__player-alert');
    cityAlert.style.visibility = 'hidden';
}

// ОБЩАЯ ФУНКЦИЯ (посещение города, интерфейс начала игры):
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
    
    showRandomTooltips(cityTooltips); // отображение случайной подсказки
    healthRegenInCityAnimation(); // восстановление здоровья персонажа, при посещении города
    hideTravelBtns();
    showCityBtns();
    showCityVisitAlert();
}
document.addEventListener('click', travelToTheCity);

// ОБЩАЯ ФУНЦИЯ (покинуть город):
function leaveTheCity(e) {
    let target = e.target;

    if (target.id !== 'leave-city') {
        return;
    }

    // let cityStoreElem = document.querySelector('.gameplay-body__city-store.city-store-container');
    // cityStoreElem.style.marginTop = '0'; // выравнивание окна магазина (когда оно скрыто)

    shoWeGameTooltipsElemAndStatsBtn(); // отобразить элемент с подсказками и кнопку характеристик персонажа
    showTravelBtns();
    hideCityBtns();
    hideCityVisitAlert();
    showRandomTooltips(combatTooltips); // отображение случайной подсказки (строки 443, 483, 662, 953, 1293)
}
document.addEventListener('click', leaveTheCity);


// ------------------------------------------------------------------ //
// ------------- ЕЩЕ ПАРА МЕТОДОВ ДЛЯ ОБЪЕКТА ПЕРСОНАЖА ------------- //
// ------------------------------------------------------------------ //


// Добавление метода к объекту персонажа - купить оружие (добавляется при создании персонажа):
function addMethodBuyWeapon() {
    let charInfoObj = adventureGame[charInfoPos];

    charInfoObj['buy_weapon'] = function(inputWeapon) {
        if (!selectedWeapon) {
            return;
        }
        // selectedWeapon = target.id
        if (inputWeapon === 'dagger-weap') {
            charInfoObj.damage = 20;
            hideDaggerInSecretShop();
        }

        if (inputWeapon === 'sword-weap') {
            charInfoObj.damage = 50;
            hideSwordInSecretShop();
        }
    }
}

// Функция покупки оружия, включает в себя метод
let selectedWeapon = ''; // --------------------------------------------------- почисти это значение для рестарта
function selectWeaponToBuy(e) {
    let target = e.target;

    if (target.id === 'dagger-weap') {
        selectedWeapon = 'dagger-weap';
        adventureGame[charInfoPos].gold -= 50;
        checkAmountOfPlayerGold();
        adventureGame[charInfoPos]['buy_weapon'](selectedWeapon);        
        fillCharStatsValues();
        target.disabled = true;
    }

    if (target.id === 'sword-weap') {
        selectedWeapon = 'sword-weap';
        adventureGame[charInfoPos].gold -= 100;
        checkAmountOfPlayerGold();
        adventureGame[charInfoPos]['buy_weapon'](selectedWeapon);        
        fillCharStatsValues();
        target.disabled = true;
    }
}
document.addEventListener('click', selectWeaponToBuy);


// Добавление метода к объекту персонажа - получение золота:
function addGainGold() {
    let charInfoObj = adventureGame[charInfoPos];

    charInfoObj['gold_increase'] = function(selectedPlayerEnemy) {
        if (!selectedPlayerEnemy) {
            return;
        }
        
        if (selectedPlayerEnemy === wild_boar) {
            charInfoObj['gold'] += 10;
            return charInfoObj;
        }

        if (selectedPlayerEnemy === blackBrowedBear) {
            charInfoObj['gold'] += 20;
            return charInfoObj;
        }
    }
}


// ------------------------------------------------------------------------------- //
// ------------- ИГРОК ВЫБИРАЕТ ПЕРЕХОД В ГОРОДСКОЙ МАГАЗИН ---------------------- //
// ------------------------------------------------------------------------------- //

// Заполнение данных по ценам на товары в магазине:
function fillGoodsPrices() {
    let priceValueNodeList = document.querySelectorAll('.price-value');
    let priceValueElemsArr = Array.from(priceValueNodeList);

    let i = 0;

    for (; i < priceValueElemsArr.length;) {        
        priceValueElemsArr[i].innerText = `${shop.health_price}`;
        i++;
        break;
    }

    for (; i < priceValueElemsArr.length;) {        
        priceValueElemsArr[i].innerText = `${shop.weapons_price['dagger']}`;
        i++;
        break;
    }

    for (; i < priceValueElemsArr.length;) {        
        priceValueElemsArr[i].innerText = `${shop.weapons_price['sword']}`;
        i++;
        break;
    }
}

// Скрыть элемент с игровыми подсказками (используется при посещении магазина):
function hideGameTooltipsElemAndStatsBtn() {
    let tooltipElem = document.querySelector('.gameplay-body__descrip');
    tooltipElem.style.display = 'none';

    let charStatsBtn = document.querySelector('.stats-container__btn');
    charStatsBtn.style.display = 'none';
}

// Отобразить элемент с игровыми подсказками:
function shoWeGameTooltipsElemAndStatsBtn() {
    let tooltipElem = document.querySelector('.gameplay-body__descrip');
    tooltipElem.style.display = 'block';

    let charStatsBtn = document.querySelector('.stats-container__btn');
    charStatsBtn.style.display = 'block';
}

// ОБЩАЯ ФУНКЦИЯ (посещение городского магазина):
function visitMagicStore(e) {
    let target = e.target;

    if (target.id !== 'magic-store') {
        return;
    }
    
    let cityStoreElem = document.querySelector('.gameplay-body__city-store.city-store-container');
    cityStoreElem.style.marginTop = '5rem'; // выравнивание окна магазина (при его отображении)

    fillGoodsPrices(); // заполнить данные по ценам на товары
    checkAmountOfPlayerGold(); // проверка количества золота у игрока
    renderStoreWindow(); // отобразить окно магазина
    hideVisitStoreBtn(); // скрыть кнопку посещения магазина
    hideGameTooltipsElemAndStatsBtn(); // скрыть элемент с игровыми подсказками и кнопку характеристик персонажа

    // отобразить кнопки покупки напротив каждого оружия (два оружия, две кнопки); секретное оружие, которое можно купить за хп (сделать тултип - "подумай дважды")
    // покупка хп; 10хп - 10 золота
    // секретное оружие уже нельзя купить после первого боя с врагом
    // отобразить кнопку возможности покинуть город
    // если у игрока недостаточно золота - кнопка покупки оружия будет задизейблена (всегда доступна только кнопка покупки оружия за хп);
    // после покупки любого оружия за голд кнопка покупки также дизейблится
    // после покупки оружия за хп - цены на остальное оружие увеличиваются в 1.5 раза;
}
document.addEventListener('click', visitMagicStore);


// Рендер окна с товарами в магазине:
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

// Проверка количества золота у игрока (если золота недостаточно, то кнопки покупки задизейблены, если на что-то хватет - то кнопка доступна):
function checkAmountOfPlayerGold() {
    let playerGoldValue = adventureGame[charInfoPos].gold;

    let buyHealthBtn = document.querySelector('.health-container__buy');
    let buyDaggerBtn = document.querySelector('.dagger-container__buy');
    let buySwordBtn = document.querySelector('.sword-container__buy');    
    
    if (playerGoldValue < shop.health_price) {        
        buyHealthBtn.disabled = true;
    } else {
        buyHealthBtn.disabled = false;
    }

    if (playerGoldValue < shop.weapons_price['dagger']) {        
        buyDaggerBtn.disabled = true;
    } else {
        buyDaggerBtn.disabled = false;
    }

    if (playerGoldValue < shop.weapons_price['sword']) {        
        buySwordBtn.disabled = true;
    } else {
        buySwordBtn.disabled = false;
    }
}

// Увеличение очков здоровья персонажа (покупка, 10 хп - 10 золота):
function buyHealthPoints(e) {
    let target = e.target;

    if (target.id !== 'buy-health') {
        return;
    }

    let charInfoObj = adventureGame[charInfoPos];
    
    charInfoObj.gold -= 10;
    checkAmountOfPlayerGold();
    charInfoObj.health_increase();
    fillCharStatsValues();
}
document.addEventListener('click', buyHealthPoints);


// ------------------------------------------------------------------------------- //
// ---------------------- ПОКУПКА СЕКРЕТНОГО ОРУЖИЯ ------------------------------ //

// Отобразить сообщение о покупке игроком секретного оружия:
function showPlayerBoughtWeaponAlert() {
    let playerBoughtWeaponAlert = document.querySelector('.alert-container__player-alert');
    playerBoughtWeaponAlert.innerHTML = `
        Рукоять оружия больно впивается в руку владельца...
    `;

    playerBoughtWeaponAlert.style.visibility = 'visible';
}

// Анимация потери очков здоровья при покупке секретного оружия:
function healthLossAnimationSecretWeap() {
    let playerHealthElem = document.querySelector('.stats-values__elem.char-health')

    playerHealthElem.style.color = 'rgb(120 7 7)';
    playerHealthElem.style.fontWeight = 'bold';

    setTimeout( () => {
        playerHealthElem.style.color = 'black';
        playerHealthElem.style.fontWeight = 'normal';
    }, 3500)
}

// Анимация увеличения урона при покупке секретного оружия:
function damageIncreaseAnimationSecretWeap() {
    let playerDamageElem = document.querySelector('.stats-values__elem.char-damage')

    playerDamageElem.style.color = 'black';
    playerDamageElem.style.fontWeight = 'bold';

    setTimeout( () => {
        playerDamageElem.style.color = 'black';
        playerDamageElem.style.fontWeight = 'normal';
    }, 3500)
}

// При покупке секретного оружия: скрыть из магазина даггер:
function hideDaggerInSecretShop() {
    let daggerItemElement = document.querySelector('.city-store-container__item.dagger-container');
    daggerItemElement.style.display = 'none';
}

// Отобразить в магазине даггер:
function showDaggerInSecretShop() {
    let daggerItemElement = document.querySelector('.city-store-container__item.dagger-container');
    daggerItemElement.style.display = 'flex';
}

// Скрыть в магазине меч:
function hideSwordInSecretShop() {
    let swordItemElement = document.querySelector('.city-store-container__item.sword-container');
    swordItemElement.style.display = 'none';
}

// Отобразить меч:
function showSwordinSecretShop() {
    let swordItemElement = document.querySelector('.city-store-container__item.sword-container');
    swordItemElement.style.display = 'flex';
}

// ОБЩАЯ ФУНКЦИЯ (покупка игроком секретного оружия):
function buySecretweapon(e) {
    let target = e.target;
    if ( (target.id !== 'secret-weap') ) {
        return;
    }

    // Покупка доступна только когда у персонажа 40хп (не больше)
    if ( adventureGame[charInfoPos].health > 40 ) {
        document.querySelector('.city-store-container__item.secret-container').style.visibility = 'hidden';
    }

    adventureGame[charInfoPos].current_max_hp_value = 20;
    healthLossAnimationSecretWeap(); // Анимация убавления хп игрока:
    adventureGame[charInfoPos].health = 20;

    damageIncreaseAnimationSecretWeap(); // Анимация увеличения урона игрока:
    adventureGame[charInfoPos]['damage'] = 25;

    // Отобразить сообщение о покупке игроком секретного оружия:
    showPlayerBoughtWeaponAlert();

    // скрыть из магазина даггер (т.к. секрет веапон лучше по урону)
    hideDaggerInSecretShop();

    // скрыть сам магический предмет (после покупки)
    let magicItemElement = document.querySelector('.city-store-container__item.secret-container');
    magicItemElement.style.display = 'none';

    fillCharStatsValues(); // перезаполнить характеристики персонажа

}
document.addEventListener('click', buySecretweapon);


// Уход из городского магазина:
function leaveMagicStore(e) {
    let target = e.target;

    if (target.id !== 'leave-city') {
        return;
    }

    hideStoreWindow();
}
document.addEventListener ('click', leaveMagicStore);


// ------------------------------------------------------------------------------- //
// -------------- РЕПЛИКИ ПЕРСОНАЖА И ОТОБРАЖЕНИЕ ПОДСКАЗОК ---------------------- //
// ------------------------------------------------------------------------------- //

// Реплики созданного персонажа:
const battleAlerts = [
    "Нужно больше тренироваться!",
    "Хм, вроде было легко...",
    "Фух...",
    "Надо проверить уровень здоровья...",
]

const missAlerts = [
    "Промах?! Изворотливый гад!",
    "Промах!",
    "Я промахнулся???",
    "Он увернулся от удара!",
]

const cityAlerts = [
    "Первым делом надо посетить таверну...",
    "Эх, стоптал сапоги...",
    "Интересно, как там поживает Цири...",
    "Говорят, что в магазине продается какое-то секретное оружие...",
    "Говорят, что в магазине продается какое-то секретное оружие...",
];

const playerWinAlerts = [
    "Н-ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ-АААААААААААААА!",
    "Н-ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ-АААААААААААААА!",
    "Н-ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ-АААААААААААААА!",
    "Н-ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ-АААААААААААААА!",
]

function randomCharacterAlerts(inputAlertsArr) {
    let alertNumber = Math.floor(Math.random() * (3 - 0 + 1) + 0); // максимум и минимум включительно    

    let alertElem = document.querySelector('.alert-container__player-alert');

    if (alertElem == null) {
        return;
    }

    alertElem.innerHTML = `
        ${adventureGame[1].nick_name}: ${inputAlertsArr[alertNumber]}
    `;

    alertElem.style.visibility = 'visible';
}

// Отображение подсказок внизу интерфейса:
const cityTooltips = [
    "Поговаривают, что при определенных обстоятельствах в городе можно приобрести секретное магическое оружие...",
    "В городском магазине можно купить дополнительные очки здоровья...",
    "Не забывайте вовремя обновлять свое вооружение...",
    "При посещении города очки здоровья персонажа восстанавливаются...",
];

const combatTooltips = [
    "Враги бывают крайне изворотливы...Даже очень...",
    "Держите друзей близко, а врагов еще ближе... Выбирайте с умом...",
    "Вам всегда предоставляется возможность первым атаковать врага. Но достаточно ли этого?",
    "До начала боя всегда есть возможность сбежать, но какже ваша гордость воина?",
];

function showRandomTooltips(inputTooltipsArr) {
    let toolTipNumber = Math.floor(Math.random() * (3 - 0 + 1) + 0); // максимум и минимум включительно
    
    let toolTipElem = document.querySelector('.gameplay-body__descrip');
    toolTipElem.innerHTML = `
        ${inputTooltipsArr[toolTipNumber]}
    `;

    //toolTipElem.style.visibility = 'visible';
}


// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------- КОНЦОВКА ИГРЫ (ПОБЕДА ИГРОКА) ------------------------------------------------------------ //
// ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
function endOfTheGamePlayerWins() {
    
    if ( !isEnemyDead(selectedPlayerEnemy) ) {
        return;
    }

    let dragonBtn = document.querySelector('#dragon_enemy');

    if ( isEnemyDead(selectedPlayerEnemy) && (dragonBtn.dataset.gameFinal === 'dragon-dead')) {
        randomCharacterAlerts(playerWinAlerts);
        hideEnemyNameAndStats();
        hideCombatBtns(); // скрыть кнопки для процесса сражения (атака, бегство)
        showRestartBtn(); // Отобразить кнопку рестарта
        showRandomTooltips(combatTooltips); // отобразить новую подсказку        
        refillCharStatsValues(); // перезаполнить и отрисовать новые (если есть) характеристики игрока        

        let pageToolTip = document.querySelector('.gameplay-body__descrip');
        pageToolTip.innerHTML = 'Поздравляем! Вы прошли игру ^_^';        
    }
}



// Читы ^^
// adventureGame[1].gold = 1500;
// checkAmountOfPlayerGold();
// fillCharStatsValues();


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
- Шестой:
    Когда лучше работать с объектами (методами объектов), а когда просто с DOM-деревом и указывать всю информацию в нем?
- Седьмой:
    ".enemy-stats-container" из-за приоритета селекторов, не работают стили, пришлось прописать их в верстке (в теге). Подумай, как сделать по-нормальному.
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