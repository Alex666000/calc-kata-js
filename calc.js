const digits = {
    Z: 2000,
    M: 2000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    VIII: 8,
    VII: 7,
    VI: 6,
    V: 5,
    IV: 4,
    III: 3,
    II: 2,
    I: 1
}
// Валидации символов:
let stringValidation = string => {
    // паттерн запрещенных символов = инвертация:
    let patternOfForbiddenSymbols = /[^IVX0-9+*\/-\s]/gi // все -- КРОМЕ -- этих символов
    if ([...string.matchAll(patternOfForbiddenSymbols)].length >= 1) {  // в строке проверяем совпадения, если массив не пустой --> вернем ошибку
        throw new Error(' В строке введены некорректные символы')
    }
    // если больше 2 знаков то ошибку:
    patternOfForbiddenSymbols = /[+*\/-]{2,}/gi
    if ([...string.matchAll(patternOfForbiddenSymbols)].length >= 1) {
        throw new Error(' Нельзя больше 1 знака вычисления')
    }

    return true // вернем либо ошибку либо true
}
// Получем операцию из строки:
let getOperation = string => {
    return [...string.match(/[+*\/-]/gi)][0]  // так как будет массив берем 1 элемент --> если индекс не указать получим массив ['+']
}

// Получаем числа из строки:
let getNums = string => {
    // ПОВТОРЕНИЕ КОДА!!!!!!!!!
    let nums = string.split(/[+*\/-]/gi).map((num) => num.trim())
    return nums
}
// Переводим из римских чисел в арабские:
let romanToArabic = string => {
    return string.toUpperCase().split('').reduce((prevVal, currentValue, i, arr) => {
            let [a, b, c] = [
            digits[arr[i]],
            digits[arr[i + 1]],
            digits[arr[i + 2]]
        ]
        if (b && c && a <= b && b < c)
            throw new Error('Incorrect roman number format: ' + string);
        return b > a ? prevVal - a : prevVal + a
    }, 0)
}


// Проверяем являются ли полученные числа римскими:
let isRoman = string => {
    let pattern = /^[IVX]+$/  // --> могут присутствовать в начале и в конце строки могут быть несколько
    let arrNums = string.toUpperCase().split(/[+*\/-]/gi).map((num) => num.trim()) // ПОВТОРЕНИЕ КОДА!!!!!!!!!

    // Проверяем массив чисел на количество чисел явл-ся римскими.
    let countRoman = arrNums.reduce((prevVal, currentValue) => prevVal + pattern.test(currentValue), 0)

    // Так как оба числа должны быть либо арабскими или римскими иначе ОШИБКА --Ю пишем проверку:
    if (countRoman === 1) {
        throw new Error('Оба числа римские или арабские')
    } else if (countRoman === 2) {
        // Переводим из римских в арабские -- берем число и перенаправляем в функцию romanToArabic ():
        return true

    }
}

// Описание фукций вычисления:
let sum = nums => {
    return nums.reduce((a, b) => a + b)
}

let mult = nums => {
    return nums.reduce((a, b) => a * b)
}

let division = nums => {
    return nums.reduce((a, b) => a / b)
}

let subtraction = nums => {
    return nums.reduce((a, b) => a - b)
}

// Проверка операции:
let checkOperation = (str, nums) => {
    let result;
    if (str === '+') {
        result = sum(nums)
    } else if (str === '*') {
        result = mult(nums)
    } else if (str === '/') {
        result = division(nums)
    } else if (str === '-') {
        result = subtraction(nums)
    }
    return Math.floor(result)
}


let calculate = string => {
    let isValid = stringValidation(string)
    // необходимо строку разбить на массив забрать число 1, 2 и операцию
    let operation = getOperation(string)
    let nums = getNums(string)
    let roman = isRoman(string)
    if (roman) {
        nums = nums.map(num => romanToArabic(num))
    }
    nums = nums.map(num => +num)
    return checkOperation(operation, nums)
}


console.log(calculate('x/ii'));
console.log(calculate('X/V'));
console.log(calculate('4/2'));
console.log(calculate('10*10'));
console.log(calculate('4*2'));
console.log(calculate('5 / '));