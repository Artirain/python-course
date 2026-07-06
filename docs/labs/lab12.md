# Лаб 12. Tkinter: виджеты

!!! abstract "Коротко о главном"
    Виджеты — элементы интерфейса: `Label` (метка), `Button` (кнопка),
    `Entry` (поле ввода), `Text` (многострочное), `Listbox` (список),
    `Radiobutton` / `Checkbutton` (переключатели/флажки). Размещаются через
    `pack()`, `place(x, y)` или `grid(row, column)`.

## Конспект

### Основные виджеты

```python
from tkinter import *
tk = Tk()

label = Label(tk, text="Привет", font="Arial 14", fg="red", bg="lightgreen")
label.place(x=10, y=10)

btn = Button(tk, text="OK", command=my_func)   # command — функция при клике
btn.pack()

entry = Entry(tk)                # однострочный ввод
entry.get()                      # прочитать текст
entry.delete(0, END)             # очистить
entry.insert(0, "текст")         # вставить

tk.mainloop()
```

### События мыши и клавиатуры

```python
widget.bind("<Button-1>", func)     # ЛКМ
widget.bind("<Button-3>", func)     # ПКМ
tk.bind("<KeyPress>", func)         # клавиша; func(event) -> event.keysym
```

### Диалоговые окна

```python
from tkinter.messagebox import *
showinfo("Заголовок", "Сообщение")        # информация
showwarning("...", "...")                 # предупреждение
showerror("...", "...")                   # ошибка
askyesno("...", "Продолжить?")            # -> True / False
```

### Listbox, Radiobutton, Checkbutton

```python
lb = Listbox(tk)
lb.insert(END, "элемент")        # добавить
lb.curselection()                # индексы выбранных
lb.delete(0)                     # удалить по индексу

var = IntVar()                   # переменная состояния
Radiobutton(tk, text="A", variable=var, value=1)   # одна из группы
Checkbutton(tk, text="B", variable=var, onvalue=1, offvalue=0)  # флажок
```

## Задание 1 — пример со звёздочкой (сова и домик)

> Начертить прямоугольник-«домик». Сова (двигается стрелками). Когда сова над
> домиком — всплывающее сообщение «Сова дома!».

??? success "Показать решение"

    ```python
    from tkinter import *
    from tkinter.messagebox import showinfo

    def move(event):
        key = event.keysym                       # какая клавиша нажата
        if key == "Up":    canva.move(sova, 0, -10)
        if key == "Down":  canva.move(sova, 0, 10)
        if key == "Left":  canva.move(sova, -10, 0)
        if key == "Right": canva.move(sova, 10, 0)

        # координаты центра совы
        x1, y1, x2, y2 = canva.coords(sova)
        cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
        # если центр в «домашней» зоне прямоугольника home
        if 150 < cx < 350 and 30 < cy < 80:
            showinfo("Дом", "Сова дома!")

    tk = Tk()
    tk.geometry("500x500")
    canva = Canvas(tk, width=500, height=500, bg="lightgreen")
    canva.pack()

    # домик (прямоугольник 200x50)
    home = canva.create_rectangle(150, 30, 350, 80, fill="brown")
    # сова (для простоты — овал; можно заменить на картинку через PhotoImage)
    sova = canva.create_oval(230, 250, 270, 290, fill="saddlebrown")

    tk.bind("<KeyPress>", move)                   # обработчик клавиш
    tk.mainloop()
    ```

## Задание 2 — два списка (перенос товаров)

> Два `Listbox` с прокруткой. Слева — товары, справа — покупки. Кнопки `>>>` и
> `<<<` переносят выбранный элемент между списками.

??? success "Показать решение"

    ```python
    from tkinter import *

    def to_right():
        sel = goods.curselection()          # индексы выбранных слева
        for i in reversed(sel):             # с конца, чтобы индексы не сбивались
            cart.insert(END, goods.get(i))  # копируем в правый
            goods.delete(i)                 # удаляем из левого

    def to_left():
        sel = cart.curselection()
        for i in reversed(sel):
            goods.insert(END, cart.get(i))
            cart.delete(i)

    tk = Tk()
    tk.title("Покупки")

    goods = Listbox(tk, height=8)
    for item in ["apple", "pear", "cherry", "apricot", "peach"]:
        goods.insert(END, item)
    goods.grid(row=0, column=0, padx=5, pady=5)

    Button(tk, text=">>>", command=to_right).grid(row=0, column=1, sticky="n", pady=10)
    Button(tk, text="<<<", command=to_left).grid(row=0, column=1, sticky="s", pady=10)

    cart = Listbox(tk, height=8)
    cart.grid(row=0, column=2, padx=5, pady=5)

    tk.mainloop()
    ```

## Задание 3 — радиокнопки без индикатора

> Несколько `Radiobutton` с `indicatoron=False` (выглядят как кнопки). При
> выборе в метке показывается соответствующая информация.

??? success "Показать решение"

    ```python
    from tkinter import *

    people = {
        "Вася": "+7 900 111-11-11",
        "Петя": "+7 900 222-22-22",
        "Маша": "+7 900 333-33-33",
    }

    def show():
        name = var.get()
        label.config(text=f"{name}: {people[name]}")

    tk = Tk()
    tk.title("Контакты")

    var = StringVar()
    for name in people:
        # indicatoron=False -> радиокнопка выглядит как обычная кнопка
        Radiobutton(tk, text=name, variable=var, value=name,
                    indicatoron=False, width=10, command=show).pack(anchor="w")

    label = Label(tk, text="Выберите человека", font="Arial 12")
    label.pack(pady=10)

    tk.mainloop()
    ```

## Задание 4 — программа-тест

> Программа-тест с флажками: при выборе верных вариантов вывести «Верно!».

??? success "Показать решение"

    ```python
    from tkinter import *

    # варианты ответа: текст -> правильный (True/False)
    answers = {
        "11, для строчного типа данных": True,
        "5, цена с надбавкой для рыночной экономики": False,
        "10, для чисел двоичной системы счисления": True,
        "2, для чисел троичной системы и выше": True,
    }

    def check():
        # верно, если у всех флажков состояние совпало с «правильностью»
        correct = all(vars[text].get() == int(is_right)
                      for text, is_right in answers.items())
        result.config(text="Верно!" if correct else "Есть ошибки")

    tk = Tk()
    tk.title("Тест")

    Label(tk, text="Сколько будет: 1 + 1 =", font="Arial 11").pack()

    vars = {}
    for text in answers:
        v = IntVar()
        vars[text] = v
        Checkbutton(tk, text=text, variable=v).pack(anchor="w")

    Button(tk, text="Проверить", command=check).pack(pady=5)
    result = Label(tk, text="Выберите верные ответы")
    result.pack()

    tk.mainloop()
    ```
