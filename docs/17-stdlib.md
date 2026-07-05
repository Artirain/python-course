# 17. Полезное из стандартной библиотеки

Python «из коробки» содержит десятки модулей. Вот самые ходовые.

## datetime — даты и время

```python
from datetime import datetime, date, timedelta

now = datetime.now()
print(now)                      # 2026-07-05 14:30:00.123
print(now.year, now.month, now.day)

today = date.today()
print(today)                    # 2026-07-05

# форматирование в строку
print(now.strftime("%d.%m.%Y %H:%M"))   # 05.07.2026 14:30

# из строки в дату
d = datetime.strptime("01.01.2026", "%d.%m.%Y")

# арифметика дат
tomorrow = today + timedelta(days=1)
week_ago = today - timedelta(weeks=1)
print(tomorrow, week_ago)
```

| Код | Значение |
|-----|----------|
| `%Y` | год (2026) |
| `%m` | месяц (07) |
| `%d` | день (05) |
| `%H:%M` | часы:минуты |

## random — случайности

```python
import random

print(random.randint(1, 6))          # случайное целое 1..6 (кубик)
print(random.random())               # дробное 0.0..1.0
print(random.choice(["орёл", "решка"]))   # случайный элемент
print(random.sample(range(1, 50), 6))     # 6 разных чисел (лотерея)

deck = [1, 2, 3, 4, 5]
random.shuffle(deck)                 # перемешать список на месте
print(deck)
```

## collections — продвинутые коллекции

### Counter — подсчёт

```python
from collections import Counter

words = ["кот", "пёс", "кот", "кот", "пёс"]
counts = Counter(words)
print(counts)                    # Counter({'кот': 3, 'пёс': 2})
print(counts["кот"])             # 3
print(counts.most_common(1))     # [('кот', 3)] — самый частый
```

### defaultdict — словарь со значением по умолчанию

```python
from collections import defaultdict

groups = defaultdict(list)       # значение по умолчанию — пустой список
groups["фрукты"].append("яблоко")   # не нужно проверять наличие ключа
groups["фрукты"].append("груша")
print(groups)                    # {'фрукты': ['яблоко', 'груша']}
```

## itertools — итераторы

```python
from itertools import count, cycle, chain, combinations

print(list(chain([1, 2], [3, 4])))          # [1, 2, 3, 4] — склеить
print(list(combinations([1, 2, 3], 2)))     # [(1,2),(1,3),(2,3)]
```

## os и pathlib — файловая система

```python
import os
from pathlib import Path

print(os.getcwd())                   # текущая папка
print(os.environ.get("PATH"))        # переменная окружения

# перебор файлов в папке
for file in Path(".").glob("*.py"):
    print(file.name)
```

## re — регулярные выражения

Поиск и разбор текста по шаблону.

```python
import re

text = "Телефон: +7 900 123-45-67"
match = re.search(r"\+7[\d\s-]+", text)
if match:
    print(match.group())         # +7 900 123-45-67

# все числа в строке
print(re.findall(r"\d+", "дом 5, кв 12"))   # ['5', '12']

# замена
print(re.sub(r"\d", "*", "abc123"))         # abc***
```

## json — обмен данными

```python
import json

data = {"name": "Аня", "age": 25}
text = json.dumps(data, ensure_ascii=False)   # -> строка
obj = json.loads(text)                         # -> обратно в словарь
```

## Куда двигаться дальше

Ты прошёл основы. Дальнейшие темы:

- **Работа с API** — библиотека `requests`.
- **Веб** — FastAPI или Django.
- **Данные** — `pandas`, `numpy`.
- **ИИ / LLM** — `openai`, `anthropic`, `langchain`.
- **Тестирование** — `pytest`.

!!! success "Главный совет"
    Пиши код каждый день. Бери маленькие задачи (телеграм-бот, парсер, скрипт
    автоматизации рутины) и доводи до конца — так навык закрепляется лучше всего.
