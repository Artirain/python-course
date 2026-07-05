# 11. Функции

Функция — переиспользуемый блок кода. Пишешь один раз — вызываешь много.

## Объявление и вызов

```python
def greet(name):
    print(f"Привет, {name}!")

greet("Аня")      # Привет, Аня!
greet("Боря")     # Привет, Боря!
```

- `def` — ключевое слово;
- `name` — параметр;
- `"Аня"` — аргумент при вызове.

## return — возврат значения

```python
def add(a, b):
    return a + b

result = add(2, 3)     # 5
print(add(10, 20))     # 30
```

Функция без `return` возвращает `None`. После `return` функция сразу завершается.

## Значения по умолчанию

```python
def greet(name, greeting="Привет"):
    print(f"{greeting}, {name}!")

greet("Аня")                    # Привет, Аня!
greet("Боря", "Здорово")        # Здорово, Боря!
```

Параметры с умолчанием идут **после** обычных.

## Именованные аргументы

Можно передавать по имени — порядок тогда неважен:

```python
def order(product, qty, price):
    return f"{qty} × {product} = {qty * price}"

print(order(price=100, product="кофе", qty=2))   # 2 × кофе = 200
```

## *args — любое число позиционных аргументов

```python
def total(*nums):          # nums станет кортежем
    return sum(nums)

print(total(1, 2, 3))       # 6
print(total(10, 20, 30, 40))  # 100
```

## **kwargs — любое число именованных аргументов

```python
def show(**data):          # data станет словарём
    for key, value in data.items():
        print(f"{key}: {value}")

show(name="Аня", age=25)    # name: Аня / age: 25
```

## Всё вместе

```python
def demo(a, b=2, *args, **kwargs):
    print(a, b, args, kwargs)

demo(1)                         # 1 2 () {}
demo(1, 2, 3, 4, x=5)           # 1 2 (3, 4) {'x': 5}
```

## Область видимости (scope)

```python
x = 10          # глобальная

def func():
    y = 5       # локальная — видна только внутри func
    print(x)    # глобальную читать можно
    print(y)

func()
# print(y)      # ОШИБКА — y не существует снаружи
```

Чтобы **изменить** глобальную переменную внутри функции, нужен `global`
(но лучше избегать — передавай значения через параметры и `return`).

## Документация функции (docstring)

```python
def area(width, height):
    """Возвращает площадь прямоугольника."""
    return width * height

print(area.__doc__)      # Возвращает площадь прямоугольника.
```

## Lambda — анонимные функции

Короткая функция «на месте», без имени. Часто как аргумент `sort`/`map`/`filter`.

```python
square = lambda x: x ** 2
print(square(5))          # 25

# сортировка по последней букве
words = ["банан", "яблоко", "груша"]
words.sort(key=lambda w: w[-1])
print(words)
```

## map и filter

```python
nums = [1, 2, 3, 4, 5]

squares = list(map(lambda x: x ** 2, nums))     # [1, 4, 9, 16, 25]
evens = list(filter(lambda x: x % 2 == 0, nums)) # [2, 4]
```

!!! tip "Чаще проще comprehension"
    `[x ** 2 for x in nums]` читается легче, чем `map`. См. следующий урок.

## Типовые аннотации (подсказки типов)

Необязательны, но улучшают читаемость и подсказки редактора:

```python
def add(a: int, b: int) -> int:
    return a + b
```

## Попробуй сам

1. Напиши функцию `is_even(n)`, возвращающую `True`/`False`.
2. Функция `greet(name, greeting="Привет")` со значением по умолчанию.
3. Функция `average(*nums)`, считающая среднее любого числа аргументов.
4. Отсортируй список слов по длине через `sort(key=lambda ...)`.
