# Шпаргалка

Весь базовый Python на одной странице. Держи открытой, пока пишешь код.

## Вывод и ввод

```python
print("текст", 42, sep=", ", end="\n")   # sep — разделитель, end — конец
name = input("Имя: ")                     # всегда возвращает строку
age = int(input("Возраст: "))             # приведи к нужному типу
```

## Типы и приведение

```python
int("10")   float("3.5")   str(42)   bool(0)   list("abc")
type(x)                 # узнать тип
isinstance(x, int)      # проверить тип
```

| Тип | Пример | Изменяемый |
|-----|--------|:---------:|
| `int` / `float` | `42`, `3.14` | — |
| `str` | `"текст"` | нет |
| `bool` | `True` / `False` | — |
| `list` | `[1, 2, 3]` | да |
| `tuple` | `(1, 2)` | нет |
| `dict` | `{"a": 1}` | да |
| `set` | `{1, 2}` | да |

## Операторы

```python
+  -  *  /        # /  всегда float:  7 / 2 == 3.5
//  %  **         # 7 // 2 == 3,  7 % 2 == 1,  2 ** 3 == 8
==  !=  <  >  <=  >=
and  or  not
in       # принадлежность:  "a" in "abc",  3 in [1,2,3]
is       # тождественность:  x is None
```

## Строки

```python
s.upper()  s.lower()  s.capitalize()  s.title()  s.swapcase()
s.strip()  s.lstrip()  s.rstrip()
s.replace("a", "b")  s.split(",")  ",".join(list)
s.find("x")  s.count("x")  s.startswith("x")  s.endswith("x")
s.isdigit()  s.isalpha()  s.isalnum()
len(s)   s[0]   s[-1]   s[1:4]   s[::-1]     # разворот
f"{name} — {age} лет"        f"{price:.2f}"   f"{n:05d}"
```

## Списки

```python
lst.append(x)   lst.insert(i, x)   lst.extend([...])
lst.remove(x)   lst.pop()          lst.clear()
lst.index(x)    lst.count(x)
lst.sort()      lst.reverse()      sorted(lst)
len(lst)  sum(lst)  min(lst)  max(lst)  x in lst
lst[1:3]   lst[::-1]
```

## Кортежи

```python
t = (1, 2, 3)      x, y, z = t          # распаковка
first, *rest = t                        # 1, [2, 3]
t.count(x)   t.index(x)                 # только эти два метода
```

## Словари

```python
d["key"]              d.get("key", default)
d["new"] = value      del d["key"]      d.pop("key")
d.keys()  d.values()  d.items()  d.update({...})
"key" in d
for k, v in d.items(): ...
```

## Множества

```python
s.add(x)   s.discard(x)   s.remove(x)
a | b   a & b   a - b   a ^ b       # объедин., пересеч., разность, симм.
set([1, 1, 2])                      # убрать дубликаты -> {1, 2}
```

## Условия

```python
if x > 0:
    ...
elif x == 0:
    ...
else:
    ...

status = "ок" if x > 0 else "нет"        # тернарный
if 0 <= x < 100: ...                      # цепочка сравнений
```

Ложь: `False, None, 0, 0.0, "", [], {}, set()`. Всё остальное — истина.

## Циклы

```python
for i in range(5): ...           # 0..4
for i in range(1, 10, 2): ...    # 1,3,5,7,9
for x in lst: ...
for i, x in enumerate(lst): ...          # индекс + значение
for a, b in zip(list1, list2): ...       # параллельно

while условие:
    ...
    break        # выйти из цикла
    continue     # к следующей итерации
```

## Функции

```python
def add(a, b=0, *args, **kwargs):
    return a + b

f = lambda x: x * 2
list(map(lambda x: x*2, lst))
list(filter(lambda x: x > 0, lst))
```

## Comprehensions

```python
[x**2 for x in range(5)]                 # список
[x for x in lst if x > 0]                # с фильтром
{k: v for k, v in pairs}                 # словарь
{x for x in lst}                         # множество
```

## Исключения

```python
try:
    ...
except ValueError as e:
    print(e)
except (TypeError, KeyError):
    ...
else:
    ...          # если ошибок не было
finally:
    ...          # выполнится всегда

raise ValueError("сообщение")
```

## Файлы

```python
with open("f.txt", "r", encoding="utf-8") as f:
    text = f.read()
    for line in f: ...

with open("f.txt", "w", encoding="utf-8") as f:   # w перезаписывает, a дописывает
    f.write("строка\n")

import json
json.dump(obj, f, ensure_ascii=False, indent=2)
obj = json.load(f)
```

## Классы

```python
class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        return f"{self.name}: Гав!"

rex = Dog("Рекс")
rex.bark()

class Puppy(Dog):                 # наследование
    def __init__(self, name):
        super().__init__(name)
```

## Полезное из stdlib

```python
import random;   random.randint(1, 6);  random.choice(lst);  random.shuffle(lst)
import math;     math.sqrt(x);  math.ceil(x);  math.floor(x);  math.pi
from datetime import datetime;  datetime.now();  now.strftime("%d.%m.%Y")
from collections import Counter;  Counter(lst).most_common(3)
```

!!! tip
    Не пытайся выучить это наизусть. Пиши код, а сюда заглядывай, когда забыл
    название метода — так всё запомнится само.
