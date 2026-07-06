# Лаб 11. Tkinter: графические примитивы и анимация

!!! abstract "Коротко о главном"
    **Tkinter** — встроенная библиотека для GUI (окна, кнопки, рисование).
    Окно создаётся через `Tk()`, рисуют на **холсте** `Canvas`. Точка отсчёта
    (0,0) — верхний левый угол. Анимация = `move()` + `after()` (повтор через
    интервал).

## Конспект

### Окно и холст

```python
from tkinter import *

tk = Tk()                       # главное окно
tk.geometry("500x500")          # размер
tk.title("Графика")             # заголовок

canva = Canvas(tk, width=450, height=450, bg="white")
canva.pack()                    # разместить холст

tk.mainloop()                   # запуск цикла обработки событий
```

### Примитивы (методы Canvas)

```python
canva.create_line(x1, y1, x2, y2, fill="red", width=4)     # линия
canva.create_rectangle(x1, y1, x2, y2, fill="lime")        # прямоугольник
canva.create_oval(x1, y1, x2, y2, fill="blue")             # овал/круг
canva.create_polygon(...)                                  # многоугольник
canva.create_text(x, y, text="Привет", fill="red")         # текст
```

Общие параметры: `fill` (заливка), `outline` (контур), `width` (толщина),
`dash` (пунктир), `activefill` (цвет при наведении).

### Идентификаторы и теги

```python
rect = canva.create_rectangle(50, 50, 100, 100, fill="blue", tags="mytag")
canva.itemconfig(rect, fill="red")          # изменить по id
canva.itemconfig("mytag", fill="green")     # изменить всю группу по тегу
canva.tag_bind("mytag", "<Button-1>", handler)   # событие на группу
```

### Анимация

```python
canva.move(obj, dx, dy)         # сдвинуть объект
canva.coords(obj)               # текущие координаты [x1,y1,x2,y2]
canva.after(50, func)           # вызвать func через 50 мс
canva.delete(obj)               # удалить объект
```

## Задание 1 — примеры со звёздочками

### ✦ Мишень → квадраты

> Переделать «мишень» из кругов в набор квадратов, где каждый третий — красный.

??? success "Показать решение"

    ```python
    from tkinter import *

    tk = Tk()
    tk.geometry("500x500")
    canva = Canvas(tk, width=450, height=450, bg="blue")
    canva.pack(expand=1)

    for i in range(10):
        if i == 9:                 # последний (центральный) — красный
            color = "red"
        elif i % 3 == 0:           # каждый третий — зелёный
            color = "green"
        else:
            color = "white"
        # create_rectangle вместо create_oval: вложенные квадраты
        canva.create_rectangle(140 + i*10, 140 + i*10,
                               340 - i*10, 340 - i*10, fill=color)

    tk.mainloop()
    ```

### ✦ Гирлянда со сменой цвета

> Гирлянда из шаров, цвет каждого меняется случайно при клике на надпись.

??? success "Показать решение"

    ```python
    from tkinter import *
    import random

    colors = ["red", "blue", "green", "purple", "orange"]

    def click_function(event):
        for _ in range(50):                 # 50 «кадров» анимации
            for i in range(16):             # перебираем все шары по тегу
                color = random.choice(colors)
                canva.itemconfig("ball" + str(i), fill=color)
            canva.update()                  # обновить холст
            canva.after(100)                # задержка 100 мс

    tk = Tk()
    tk.geometry("600x300")
    canva = Canvas(tk, width=600, height=300, bg="lightgreen")
    canva.pack()

    for i in range(16):                     # рисуем 16 шаров
        color = random.choice(colors)
        canva.create_oval(20 + i*35, 50, 40 + i*35, 70,
                         fill=color, tags="ball" + str(i))

    canva.create_line(0, 50, 600, 50)       # провод гирлянды
    canva.create_text(300, 150, text="нажми", font="Arial 16",
                     fill="red", activefill="blue", tags="start")
    canva.tag_bind("start", "<Button-1>", click_function)

    tk.mainloop()
    ```

### ✦ Движущийся шар, исчезающий у границы

> Шар движется вправо и **исчезает** при достижении правой границы окна.

??? success "Показать решение"

    ```python
    from tkinter import *
    import random

    def move_ball():
        step = random.randint(1, 20)        # случайный шаг
        canva.move(ball, step, 0)           # сдвиг вправо
        if canva.coords(ball)[2] < 500:     # правый край [2] ещё в окне
            canva.after(50, move_ball)      # продолжаем движение
        else:
            canva.delete(ball)              # достиг границы -> удаляем

    tk = Tk()
    tk.geometry("500x500")
    canva = Canvas(tk, width=500, height=500, bg="lightgreen")
    canva.pack()

    ball = canva.create_oval(50, 50, 100, 100, fill="red")
    move_ball()
    tk.mainloop()
    ```

## Задание 2 — рисунок из фигур с анимацией

> Программа с рисунком из геометрических фигур и элементами анимации. Тема
> произвольная. Пример ниже — **светофор**, который переключает сигналы.

??? success "Показать решение"

    ```python
    from tkinter import *

    tk = Tk()
    tk.geometry("250x450")
    tk.title("Светофор")
    canva = Canvas(tk, width=250, height=450, bg="lightblue")
    canva.pack()

    # корпус светофора
    canva.create_rectangle(75, 20, 175, 320, fill="black")
    # три сигнала (сохраняем id, чтобы менять цвет)
    red    = canva.create_oval(85, 30, 165, 110, fill="gray")
    yellow = canva.create_oval(85, 130, 165, 210, fill="gray")
    green  = canva.create_oval(85, 230, 165, 310, fill="gray")

    states = ["red", "yellow", "green"]   # последовательность сигналов
    index = 0

    def switch():
        global index
        # гасим все, зажигаем текущий
        canva.itemconfig(red, fill="gray")
        canva.itemconfig(yellow, fill="gray")
        canva.itemconfig(green, fill="gray")
        current = states[index]
        if current == "red":    canva.itemconfig(red, fill="red")
        if current == "yellow": canva.itemconfig(yellow, fill="yellow")
        if current == "green":  canva.itemconfig(green, fill="green")

        index = (index + 1) % 3          # следующий сигнал по кругу
        canva.after(1000, switch)        # переключение раз в секунду

    switch()
    tk.mainloop()
    ```

!!! tip "Совет"
    Для сдачи достаточно любой темы: снеговик, домик, машинка, часы. Главное —
    показать **фигуры** (`create_*`) и **анимацию** через `move`/`after`.
