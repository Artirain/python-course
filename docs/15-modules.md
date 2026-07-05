# 15. Модули и импорты

Модуль — это просто файл с кодом на Python. Импорт позволяет использовать код
из других файлов и библиотек.

## Импорт встроенных модулей

```python
import math
print(math.sqrt(16))        # 4.0

# импортировать только нужное
from math import sqrt, pi
print(sqrt(25))             # 5.0
print(pi)                   # 3.14159...

# псевдоним (alias)
import math as m
print(m.floor(3.7))         # 3
```

## Формы импорта

| Форма | Использование |
|-------|--------------|
| `import math` | `math.sqrt(x)` |
| `from math import sqrt` | `sqrt(x)` |
| `from math import sqrt, pi` | несколько имён |
| `import numpy as np` | псевдоним |
| `from math import *` | всё (не рекомендуется) |

!!! warning "Избегай `from module import *`"
    Он тащит все имена в твой код, из-за чего непонятно, откуда что взялось,
    и можно случайно перекрыть свои переменные.

## Полезные встроенные модули

| Модуль | Для чего |
|--------|----------|
| `math` | математика |
| `random` | случайные числа |
| `datetime` | даты и время |
| `os` | файловая система, окружение |
| `sys` | аргументы, интерпретатор |
| `json` | работа с JSON |
| `re` | регулярные выражения |
| `collections` | Counter, defaultdict и др. |

## Свой модуль

Создай файл `utils.py`:

```python
# utils.py
def greet(name):
    return f"Привет, {name}!"

PI = 3.14159
```

Используй его в `main.py` (в той же папке):

```python
# main.py
import utils

print(utils.greet("Аня"))       # Привет, Аня!
print(utils.PI)                 # 3.14159

# или
from utils import greet
print(greet("Боря"))
```

## if __name__ == "__main__"

Код внутри этого блока выполняется, только если файл запущен **напрямую**,
а не импортирован.

```python
# utils.py
def greet(name):
    return f"Привет, {name}!"

if __name__ == "__main__":
    # выполнится при `python utils.py`,
    # но НЕ при `import utils`
    print(greet("тест"))
```

Это стандартная конструкция: позволяет и импортировать модуль, и запускать
как скрипт (например, для тестов внутри файла).

## Установка сторонних пакетов (pip)

Пакеты из [PyPI](https://pypi.org) ставят через `pip`:

```bash
pip install requests
```

Использование:

```python
import requests
response = requests.get("https://api.github.com")
print(response.status_code)     # 200
```

## Виртуальное окружение

Изолирует зависимости проекта, чтобы они не смешивались между проектами.

```bash
python -m venv .venv           # создать
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

pip install requests           # ставится только в это окружение
pip freeze > requirements.txt  # сохранить список зависимостей
pip install -r requirements.txt  # установить из списка
```

## Попробуй сам

1. Импортируй `random` и выведи случайное число от 1 до 100.
2. Создай модуль `mymath.py` с функцией `square(x)` и вызови её из другого файла.
3. Добавь в свой модуль блок `if __name__ == "__main__"` с тестовым выводом.
