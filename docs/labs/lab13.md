# Лаб 13. Tkinter: группировка, меню, вкладки

!!! abstract "Коротко о главном"
    Для сложных интерфейсов виджеты группируют: **Frame** / **LabelFrame** —
    области-контейнеры, **Menu** — иерархическое меню, **Notebook** (из
    `tkinter.ttk`) — вкладки.

## Конспект

### Frame и LabelFrame

```python
from tkinter import *
tk = Tk()

frame = Frame(tk)                       # контейнер без рамки
frame.pack(side=LEFT)
Label(frame, text="1", bg="yellow").pack()   # виджеты кладём во фрейм

lf = LabelFrame(tk, text="Группа")      # фрейм с подписью
lf.pack()
```

### Menu

```python
def action(): print("клик")

file_menu = Menu(tearoff=0)             # подменю (tearoff=0 — нельзя оторвать)
file_menu.add_command(label="New", command=action)
file_menu.add_separator()               # разделитель
file_menu.add_command(label="Exit", command=tk.quit)

main_menu = Menu()                      # главное меню
main_menu.add_cascade(label="File", menu=file_menu)   # раскрывающийся пункт
main_menu.add_cascade(label="Edit")

tk.config(menu=main_menu)               # прикрепить меню к окну
```

Методы: `add_command`, `add_cascade` (подменю), `add_separator`,
`add_radiobutton`, `add_checkbutton`. Контекстное меню — через `post(x, y)` по
`<Button-3>`.

### Notebook (вкладки)

```python
from tkinter import ttk

notebook = ttk.Notebook()
notebook.pack(expand=True, fill=BOTH)

frame1 = ttk.Frame(notebook)            # каждая вкладка — Frame
frame2 = ttk.Frame(notebook)
notebook.add(frame1, text="Python")     # добавить вкладку с заголовком
notebook.add(frame2, text="Java")

notebook.hide(0)        # временно скрыть вкладку по индексу
notebook.forget(frame1) # удалить вкладку совсем
```

## Задание

> Дополнить пример с меню так, чтобы при `File → New` открывалось новое окно со
> вкладками, на которых размещены сгруппированные виджеты. Первое окно
> скрывается.

??? success "Показать решение"

    ```python
    from tkinter import *
    from tkinter import ttk

    def open_new_window():
        tk.withdraw()                       # скрываем первое окно

        win = Toplevel()                    # новое окно поверх главного
        win.title("Вкладки")
        win.geometry("300x250")

        # при закрытии второго окна возвращаем первое
        win.protocol("WM_DELETE_WINDOW", lambda: (win.destroy(), tk.deiconify()))

        notebook = ttk.Notebook(win)        # набор вкладок
        notebook.pack(expand=True, fill=BOTH)

        # --- Вкладка 1: поле ввода и кнопка ---
        tab1 = ttk.Frame(notebook)
        ttk.Label(tab1, text="Введите имя:").pack(pady=5)
        ttk.Entry(tab1).pack(pady=5)
        ttk.Button(tab1, text="OK").pack(pady=5)
        notebook.add(tab1, text="Форма")

        # --- Вкладка 2: переключатели ---
        tab2 = ttk.Frame(notebook)
        var = StringVar(value="1")
        ttk.Radiobutton(tab2, text="Вариант A", variable=var, value="1").pack(anchor="w")
        ttk.Radiobutton(tab2, text="Вариант B", variable=var, value="2").pack(anchor="w")
        notebook.add(tab2, text="Выбор")

    tk = Tk()
    tk.title("МЕНЮ")
    tk.geometry("300x200")

    # подменю File (описываем ДО главного меню)
    file_menu = Menu(tearoff=0)
    file_menu.add_command(label="New", command=open_new_window)   # <- открытие окна
    file_menu.add_command(label="Save")
    file_menu.add_command(label="Open")
    file_menu.add_separator()
    file_menu.add_command(label="Exit", command=tk.quit)

    main_menu = Menu()
    main_menu.add_cascade(label="File", menu=file_menu)
    main_menu.add_cascade(label="Edit")
    main_menu.add_cascade(label="View")

    tk.config(menu=main_menu)
    tk.mainloop()
    ```

!!! note "Toplevel vs Tk"
    Второе окно создаётся через `Toplevel()`, а не `Tk()` — в приложении должно
    быть **одно** главное окно `Tk`. `withdraw()` прячет окно, `deiconify()`
    показывает снова.
