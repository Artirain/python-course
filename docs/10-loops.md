# 10. Циклы

Циклы повторяют код много раз.

## Цикл for

Перебирает элементы любой коллекции.

```python
for fruit in ["яблоко", "груша", "слива"]:
    print(fruit)

for char in "abc":
    print(char)              # a / b / c

for key, value in {"a": 1, "b": 2}.items():
    print(key, value)
```

## range — диапазон чисел

```python
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):       # 1, 2, 3, 4, 5 (конец не включён)
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8 (шаг 2)
    print(i)

for i in range(5, 0, -1):   # 5, 4, 3, 2, 1 (обратный отсчёт)
    print(i)
```

| Вызов | Что даёт |
|-------|----------|
| `range(n)` | от 0 до n-1 |
| `range(a, b)` | от a до b-1 |
| `range(a, b, step)` | от a до b-1 с шагом step |

## enumerate — индекс + значение

```python
fruits = ["яблоко", "груша", "слива"]
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")      # 0: яблоко / 1: груша / 2: слива

# начать нумерацию с 1
for i, fruit in enumerate(fruits, start=1):
    print(i, fruit)
```

## zip — параллельный перебор

```python
names = ["Аня", "Боря"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name} — {age}")     # Аня — 25 / Боря — 30
```

## Цикл while

Повторяется, пока условие истинно.

```python
count = 0
while count < 5:
    print(count)
    count += 1                # ОБЯЗАТЕЛЬНО меняем условие!
```

!!! danger "Бесконечный цикл"
    Если условие `while` никогда не станет ложным — программа зависнет.
    Всегда следи, чтобы внутри цикла условие приближалось к завершению.
    Прервать зависший скрипт — `Ctrl + C`.

## break и continue

```python
# break — выйти из цикла досрочно
for i in range(100):
    if i == 3:
        break
    print(i)             # 0, 1, 2

# continue — пропустить текущий шаг, перейти к следующему
for i in range(5):
    if i % 2 == 0:
        continue
    print(i)             # 1, 3 (только нечётные)
```

## else у цикла

Блок `else` выполнится, если цикл завершился **без** `break`:

```python
for n in [3, 5, 7]:
    if n % 2 == 0:
        print("Нашли чётное")
        break
else:
    print("Чётных нет")     # выполнится — break не сработал
```

## Вложенные циклы

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}x{j}={i*j}", end="  ")
    print()               # перенос строки после каждой строки таблицы
```

## Типичные задачи

```python
# сумма чисел
total = 0
for n in [4, 8, 15, 16]:
    total += n
print(total)          # 43

# поиск максимума вручную
nums = [3, 9, 2, 7]
biggest = nums[0]
for n in nums:
    if n > biggest:
        biggest = n
print(biggest)        # 9
```

## Попробуй сам

1. Выведи таблицу умножения на 7 (от 1 до 10).
2. Считай сумму чисел, пока пользователь не введёт 0 (`while`).
3. Пройди по списку слов и выведи только те, что длиннее 4 символов.
4. Найди все чётные числа от 1 до 20.

??? success "Показать решения"

    ```python
    # 1
    for i in range(1, 11):
        print(f"7 x {i} = {7 * i}")

    # 2
    total = 0
    while True:
        n = int(input("Число (0 — стоп): "))
        if n == 0:
            break
        total += n
    print("Сумма:", total)

    # 3
    words = ["кот", "собака", "ёж", "попугай"]
    for w in words:
        if len(w) > 4:
            print(w)

    # 4
    for n in range(1, 21):
        if n % 2 == 0:
            print(n)
    ```
