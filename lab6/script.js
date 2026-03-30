const a = 21;
const b = 3;

console.log("Завдання 1: Змінні та математичні операції");
console.log("Сума:", a + b);
console.log("Різниця:", a - b);
console.log("Множення:", a * b);
console.log("Ділення:", a / b);


console.log("\nЗавдання 2: Робота з рядками");
const firstName = "Максим";
const lastName = "Шевченко";
const fullName = firstName + " " + lastName;
console.log("Привіт, " + fullName + "!");


console.log("\nЗавдання 3: Умовний оператор (if/else)");
let age = 20;
if (age >= 18) {
    console.log("Доступ дозволено");
} else {
    console.log("Доступ заборонено");
}

console.log("\nЗавдання 4: Цикл for");
for (let i = 1; i <= 10; i++) {
    console.log("Число:", i);
}

console.log("\nЗавдання 5: Функції");
function square(number) {
    return number * number;}
let result = square(5);
console.log("Квадрат числа 5 дорівнює:", result);


console.log("\nЗавдання 6: Робота з масивами");
const fruits = ["Ківі", "Банан", "Персик"];
fruits.push("Яблуко");
console.log("Список фруктів:", fruits);