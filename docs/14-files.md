# 14. Работа с файлами

## Открытие файла: with open

Правильный способ работать с файлами — через `with`. Он **сам закроет** файл,
даже если возникнет ошибка.

```python
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
print(content)
```

- первый аргумент — путь к файлу;
- второй — режим (см. таблицу);
- `encoding="utf-8"` — почти всегда нужен для русского текста.

## Режимы открытия

| Режим | Что делает |
|-------|-----------|
| `"r"` | чтение (по умолчанию); ошибка, если файла нет |
| `"w"` | запись; **перезаписывает** файл целиком |
| `"a"` | дозапись в конец |
| `"x"` | создать новый; ошибка, если уже существует |
| `"r+"` | чтение и запись |
| `"rb"` / `"wb"` | двоичный режим (картинки, архивы) |

## Чтение

```python
with open("data.txt", encoding="utf-8") as f:
    text = f.read()             # весь файл одной строкой

with open("data.txt", encoding="utf-8") as f:
    lines = f.readlines()       # список строк (с \n на концах)

# Построчно — самый памятеэкономный способ для больших файлов
with open("data.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())     # strip убирает перенос строки
```

## Запись

```python
# w — перезаписать
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("Первая строка\n")
    f.write("Вторая строка\n")

# a — дописать в конец
with open("out.txt", "a", encoding="utf-8") as f:
    f.write("Ещё строка\n")

# записать список строк
lines = ["раз\n", "два\n", "три\n"]
with open("out.txt", "w", encoding="utf-8") as f:
    f.writelines(lines)
```

!!! danger "Режим w стирает файл"
    Открытие в режиме `"w"` **сразу очищает** файл. Если нужно дописать —
    используй `"a"`.

## Проверка существования и пути

Модуль `pathlib` — современный способ работать с путями.

```python
from pathlib import Path

p = Path("data.txt")
print(p.exists())        # есть ли файл
print(p.name)            # data.txt
print(p.suffix)          # .txt

# прочитать / записать одной строкой
text = Path("data.txt").read_text(encoding="utf-8")
Path("out.txt").write_text("привет", encoding="utf-8")
```

## Работа с JSON

Частый формат для хранения данных (настройки, обмен по API).

```python
import json

data = {"name": "Аня", "age": 25, "skills": ["Python", "SQL"]}

# записать словарь в файл
with open("user.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# прочитать обратно
with open("user.json", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded["name"])       # Аня

# строка <-> объект
s = json.dumps(data, ensure_ascii=False)   # объект -> строка
obj = json.loads(s)                        # строка -> объект
```

`ensure_ascii=False` — чтобы русские буквы сохранялись как есть, а не как `\uXXXX`.

## Попробуй сам

1. Запиши в файл три строки, потом прочитай и выведи их.
2. Посчитай количество строк в файле.
3. Сохрани словарь в JSON и загрузи обратно.
4. Проверь через `pathlib`, существует ли файл, перед чтением.
