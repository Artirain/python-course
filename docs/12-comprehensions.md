# 12. Comprehensions

Comprehension — способ создать список/словарь/множество одной короткой строкой.
Это идиоматичный, «питоновский» стиль.

## Списковое включение (list comprehension)

Обычный цикл:

```python
squares = []
for x in range(5):
    squares.append(x ** 2)
# [0, 1, 4, 9, 16]
```

То же самое одной строкой:

```python
squares = [x ** 2 for x in range(5)]
# [0, 1, 4, 9, 16]
```

Синтаксис: `[выражение for элемент in коллекция]`.

## С условием (фильтрация)

```python
# только чётные
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# длины слов длиннее 3 символов
words = ["кот", "собака", "ёж", "попугай"]
long_lens = [len(w) for w in words if len(w) > 3]
# [6, 7]
```

Синтаксис: `[выражение for элемент in коллекция if условие]`.

## Условие в выражении (if/else)

```python
labels = ["чёт" if x % 2 == 0 else "нечёт" for x in range(4)]
# ['чёт', 'нечёт', 'чёт', 'нечёт']
```

!!! info "Где стоит if"
    - `if` **в конце** — фильтр (оставить/пропустить элемент).
    - `if/else` **в начале** — выбор значения для каждого элемента.

## Преобразования

```python
names = ["аня", "боря", "вера"]
caps = [name.capitalize() for name in names]
# ['Аня', 'Боря', 'Вера']

nums_str = ["1", "2", "3"]
nums = [int(n) for n in nums_str]
# [1, 2, 3]
```

## Словарное включение (dict comprehension)

```python
squares = {x: x ** 2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

prices = {"кофе": 100, "чай": 50}
with_vat = {name: price * 1.2 for name, price in prices.items()}
# {'кофе': 120.0, 'чай': 60.0}
```

## Множественное включение (set comprehension)

```python
text = "абракадабра"
letters = {char for char in text}
# {'а', 'б', 'р', 'к', 'д'} — уникальные буквы
```

## Вложенные

```python
# все пары
pairs = [(x, y) for x in range(2) for y in range(2)]
# [(0, 0), (0, 1), (1, 0), (1, 1)]

# «выпрямить» матрицу в один список
matrix = [[1, 2], [3, 4]]
flat = [n for row in matrix for n in row]
# [1, 2, 3, 4]
```

## Когда НЕ использовать

Если comprehension становится длинным и нечитаемым — вернись к обычному циклу.
Читаемость важнее краткости.

```python
# так — перебор, лучше обычный цикл
result = [complex_func(x) for row in data for x in row if check(x) and other(x)]
```

## Попробуй сам

1. Список квадратов чисел от 1 до 10.
2. Из списка слов оставь только те, что начинаются с гласной.
3. Словарь `{число: чётное/нечётное}` для чисел 1–5.
4. Получи уникальные первые буквы из списка имён (set comprehension).
