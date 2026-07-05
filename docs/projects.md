# Мини-проекты

Лучший способ закрепить базу — собрать что-то работающее. Ниже проекты по
нарастающей сложности с **полными решениями**. Совет: сначала попробуй сам,
и только потом подсматривай код.

Каждый проект помечен, какие темы курса он закрепляет.

---

## 1. Угадай число

:material-tag: *input, циклы, условия, `random`*

Компьютер загадывает число, ты угадываешь, программа подсказывает «больше/меньше».

```python
import random

secret = random.randint(1, 100)
attempts = 0

print("Я загадал число от 1 до 100. Угадай!")

while True:
    guess = int(input("Твой вариант: "))
    attempts += 1

    if guess < secret:
        print("Больше 🔼")
    elif guess > secret:
        print("Меньше 🔽")
    else:
        print(f"Верно! Ты угадал за {attempts} попыток 🎉")
        break
```

!!! question "Прокачай"
    Ограничь число попыток до 7. Если не угадал — программа проигрывает.

---

## 2. Калькулятор

:material-tag: *функции, условия, обработка ошибок*

```python
def calculate(a, op, b):
    if op == "+":
        return a + b
    elif op == "-":
        return a - b
    elif op == "*":
        return a * b
    elif op == "/":
        if b == 0:
            return "На ноль делить нельзя"
        return a / b
    else:
        return "Неизвестная операция"

while True:
    raw = input("Введи выражение (например 2 + 3) или 'выход': ")
    if raw == "выход":
        break
    try:
        a, op, b = raw.split()
        result = calculate(float(a), op, float(b))
        print("=", result)
    except ValueError:
        print("Формат: число операция число")
```

---

## 3. Конвертер температур

:material-tag: *функции, f-строки, ввод/вывод*

```python
def c_to_f(c):
    return c * 9 / 5 + 32

def f_to_c(f):
    return (f - 32) * 5 / 9

print("1 — из Цельсия в Фаренгейты")
print("2 — из Фаренгейтов в Цельсии")
choice = input("Выбор: ")
value = float(input("Значение: "))

if choice == "1":
    print(f"{value}°C = {c_to_f(value):.1f}°F")
elif choice == "2":
    print(f"{value}°F = {f_to_c(value):.1f}°C")
else:
    print("Нет такого пункта")
```

---

## 4. Генератор пароля

:material-tag: *строки, `random`, циклы*

```python
import random
import string

length = int(input("Длина пароля: "))
alphabet = string.ascii_letters + string.digits + "!@#$%"

password = "".join(random.choice(alphabet) for _ in range(length))
print("Твой пароль:", password)
```

`string.ascii_letters` — все латинские буквы, `string.digits` — цифры `0-9`.

---

## 5. Список дел (to-do)

:material-tag: *списки, словари, циклы, меню*

```python
tasks = []

def show():
    if not tasks:
        print("Список пуст")
    for i, task in enumerate(tasks, start=1):
        status = "✅" if task["done"] else "⬜"
        print(f"{i}. {status} {task['title']}")

while True:
    print("\n1-добавить  2-выполнить  3-показать  4-выход")
    cmd = input("> ")

    if cmd == "1":
        title = input("Что сделать: ")
        tasks.append({"title": title, "done": False})
    elif cmd == "2":
        show()
        num = int(input("Номер выполненной: "))
        tasks[num - 1]["done"] = True
    elif cmd == "3":
        show()
    elif cmd == "4":
        break
```

!!! question "Прокачай"
    Добавь удаление задачи и сохранение списка в файл (`json`), чтобы он не
    терялся между запусками — см. [урок 14](14-files.md).

---

## 6. Викторина

:material-tag: *словари, циклы, подсчёт очков*

```python
questions = {
    "Столица Франции?": "париж",
    "Сколько будет 2 + 2?": "4",
    "Язык этого курса?": "python",
}

score = 0
for question, answer in questions.items():
    user = input(question + " ").strip().lower()
    if user == answer:
        print("Верно! ✅")
        score += 1
    else:
        print(f"Неверно. Правильный ответ: {answer}")

print(f"\nИтог: {score} из {len(questions)}")
```

---

## Куда двигаться после базы

Собери что-то своё и доведи до конца — это ценнее десяти прочитанных статей:

- **Телеграм-бот** (библиотека `aiogram`) — например, напоминалка.
- **Парсер** сайта или погоды (`requests` + API).
- **CLI-утилита** для рутины (переименовать файлы, посчитать статистику).

!!! success "Правило одного проекта"
    Не начинай пять проектов сразу. Возьми один маленький и доведи до рабочего
    состояния — так навык закрепляется лучше всего.
