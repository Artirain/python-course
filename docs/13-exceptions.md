# 13. Исключения (обработка ошибок)

Когда что-то идёт не так, Python выбрасывает **исключение** и программа падает.
Чтобы этого избежать, ошибки можно перехватывать.

## Проблема

```python
age = int(input("Возраст: "))   # если ввести "abc" — программа упадёт
```

## try / except

```python
try:
    age = int(input("Возраст: "))
    print(f"Через год будет {age + 1}")
except ValueError:
    print("Это не число!")
```

- `try` — «попробовать» рискованный код;
- `except` — что делать, если возникла ошибка.

## Частые типы исключений

| Исключение | Когда возникает |
|------------|-----------------|
| `ValueError` | неверное значение (`int("abc")`) |
| `TypeError` | неверный тип (`"5" + 5`) |
| `KeyError` | нет такого ключа в словаре |
| `IndexError` | индекс за пределами списка |
| `ZeroDivisionError` | деление на ноль |
| `FileNotFoundError` | файл не найден |
| `AttributeError` | нет такого метода/атрибута |

## Несколько except

```python
try:
    result = 10 / int(input("Делитель: "))
except ValueError:
    print("Введите число")
except ZeroDivisionError:
    print("На ноль делить нельзя")
```

Можно объединить в один:

```python
try:
    ...
except (ValueError, ZeroDivisionError):
    print("Ошибка ввода")
```

## Получить текст ошибки

```python
try:
    x = int("abc")
except ValueError as e:
    print(f"Ошибка: {e}")     # Ошибка: invalid literal for int()...
```

## else и finally

```python
try:
    num = int(input("Число: "))
except ValueError:
    print("Не число")
else:
    print(f"Отлично, {num}")   # если ошибки НЕ было
finally:
    print("Готово")            # выполнится ВСЕГДА
```

- `else` — если в `try` не было ошибок;
- `finally` — выполняется всегда (например, закрыть файл/соединение).

## Возбуждение исключения — raise

Можно выбросить ошибку самому:

```python
def set_age(age):
    if age < 0:
        raise ValueError("Возраст не может быть отрицательным")
    return age

try:
    set_age(-5)
except ValueError as e:
    print(e)      # Возраст не может быть отрицательным
```

## Практика: цикл до корректного ввода

```python
while True:
    try:
        age = int(input("Возраст: "))
        break                       # ввод верный — выходим
    except ValueError:
        print("Нужно число, попробуй ещё раз")
print(f"Твой возраст: {age}")
```

!!! warning "Не перехватывай всё подряд"
    `except Exception:` без разбора скрывает реальные баги. Лови конкретные
    типы ошибок, которые ожидаешь.

## Попробуй сам

1. Раздели два числа, обработав деление на ноль и нечисловой ввод.
2. Достань элемент списка по индексу, обработав `IndexError`.
3. Напиши функцию, которая бросает `ValueError` для пустой строки.

??? success "Показать решения"

    ```python
    # 1
    try:
        a = int(input("a: "))
        b = int(input("b: "))
        print(a / b)
    except ZeroDivisionError:
        print("На ноль нельзя")
    except ValueError:
        print("Введите числа")

    # 2
    lst = [1, 2, 3]
    try:
        print(lst[10])
    except IndexError:
        print("Нет такого индекса")

    # 3
    def check(s):
        if s == "":
            raise ValueError("Строка пустая")
        return s
    ```
