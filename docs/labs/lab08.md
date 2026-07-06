# Лаб 8. Функции

!!! abstract "Коротко о главном"
    **Функция** — именованный блок кода, который можно вызывать многократно.
    Определяется через `def`, может принимать аргументы и через `return`
    возвращать результат. **Процедура** — функция, которая ничего не возвращает
    (например, просто печатает сообщение).

## Конспект

### Определение и вызов

```python
def add(a, b):          # a, b — параметры
    return a + b        # возврат результата

print(add(5, 6))        # вызов -> 11
```

### Виды аргументов

```python
def power(base, exponent=2):   # exponent по умолчанию = 2
    return base ** exponent

power(3)              # 9  (взял exponent=2)
power(3, 3)           # 27
power(base=2, exp=8)  # передача по имени
```

### return

```python
def calc(x, y):
    return x + y, x - y      # можно вернуть несколько значений (кортеж)

s, d = calc(10, 3)           # s=13, d=7

def check(age):
    if age < 1:
        return               # ранний выход без значения
    print("ok")
```

### Область видимости и `global`

```python
a = 0
def f():
    global a      # без global присваивание создаст ЛОКАЛЬНУЮ a
    a = 1
f()
print(a)          # 1
```

### Рекурсия и lambda

```python
def factorial(n):                    # функция вызывает саму себя
    return 1 if n == 0 else n * factorial(n - 1)

square = lambda x: x ** 2            # анонимная функция
square(5)                            # 25
```

### Функция как значение

```python
def do(a, b, op):        # op — функция, переданная параметром
    return op(a, b)

do(5, 4, add)            # 9
```

## Задание

> Не применяя встроенные функции, решить задачу на основе пользовательских
> процедур или функций. Найди свой номер варианта (варианты 1 и 16 совпадают,
> 2 и 17, … 15 и 30).

!!! note "«Не применяя встроенные функции»"
    Значит `min`, `max`, `sum` и т.п. реализуем **сами** через цикл. Функцию
    `input()`/`print()` использовать можно — это ввод-вывод, а не вычисления.

### Вариант 1 (и 16)

> Функция произведения двух чисел; процедура вывода ошибки. Запрашивать
> положительные числа; при вводе отрицательного — вызвать процедуру ошибки.

```python
def error():                    # процедура: только печатает сообщение
    print("Ошибка: числа должны быть положительными!")

def multiply(a, b):             # функция: возвращает произведение
    return a * b

a = float(input("Первое число: "))
b = float(input("Второе число: "))
if a < 0 or b < 0:              # проверка условия
    error()                    # вызов процедуры ошибки
else:
    print("Произведение:", multiply(a, b))
```

### Вариант 2 (и 17)

> Функция с 3 числами, выполняет операцию по выбору: 1 — минимум, 2 — среднее.
> Вывод ошибки — процедура.

```python
def error():
    print("Ошибка: неверный код операции (нужно 1 или 2)!")

def operate(a, b, c, code):
    if code == 1:                     # минимум без встроенного min()
        m = a
        if b < m: m = b
        if c < m: m = c
        return m
    elif code == 2:                   # среднее арифметическое
        return (a + b + c) / 3
    else:
        return None                   # сигнал неверной операции

a, b, c = 5, 2, 8
code = int(input("1 - минимум, 2 - среднее: "))
result = operate(a, b, c, code)
if result is None:
    error()
else:
    print("Результат:", result)
```

### Вариант 3 (и 18)

> Процедура вычисляет разность двух чисел двумя способами: 1) без параметров
> (числа — глобальные переменные); 2) с параметрами.

```python
# Способ 1: процедура без параметров, работает с глобальными x и y
x = 10
y = 3
def diff_global():
    print("Разность (глобальные):", x - y)

# Способ 2: процедура с параметрами
def diff_params(a, b):
    print("Разность (параметры):", a - b)

diff_global()          # 7
diff_params(20, 8)     # 12
```

### Вариант 4 (и 19)

> Процедура выводит в столбик все цифры числа, начиная с последней. Если
> ввели не число — вызвать процедуру ошибки.

```python
def error():
    print("Ошибка: введено не целое число!")

def print_digits(n):
    n = abs(n)             # знак не важен
    if n == 0:
        print(0)
        return
    while n > 0:
        print(n % 10)      # последняя цифра
        n //= 10           # отбрасываем её

text = input("Введите целое число: ")
if text.lstrip("-").isdigit():   # проверяем, что это целое (с учётом минуса)
    print_digits(int(text))
else:
    error()
```

### Вариант 5 (и 20)

> Процедура вычисления степени положительного числа (число и степень).
> Отрицательное основание — процедура ошибки.

```python
def error():
    print("Ошибка: основание должно быть положительным!")

def power(base, exp):
    result = 1
    for _ in range(exp):     # возведение в степень через цикл
        result *= base
    print(f"{base} ^ {exp} = {result}")

base = float(input("Основание: "))
exp = int(input("Степень: "))
if base < 0:
    error()
else:
    power(base, exp)
```

### Вариант 6 (и 21)

> «Функция в функции» для расчёта минимума 3 чисел. При вводе строки —
> процедура ошибки.

```python
def error():
    print("Ошибка: нужно ввести число!")

def find_min(a, b, c):
    def min2(x, y):          # вложенная (локальная) функция
        return x if x < y else y
    return min2(min2(a, b), c)   # минимум из трёх через минимум из двух

try:
    a = float(input("a: "))
    b = float(input("b: "))
    c = float(input("c: "))
    print("Минимум:", find_min(a, b, c))
except ValueError:           # введена строка вместо числа
    error()
```

### Вариант 7 (и 22)

> Процедура принимает натуральные числа и выводит первые N чисел
> арифметической прогрессии. Не натуральное — процедура ошибки.

```python
def error():
    print("Ошибка: нужны натуральные числа!")

def arithmetic(a1, d, n):       # первый член, разность, количество
    current = a1
    for _ in range(n):
        print(current, end=" ")
        current += d
    print()

a1 = int(input("Первый член: "))
d = int(input("Разность: "))
n = int(input("Сколько чисел: "))
if a1 < 1 or n < 1:             # натуральные — целые >= 1
    error()
else:
    arithmetic(a1, d, n)
```

### Вариант 8 (и 23)

> Функция с 3 числами, операция: 1 — сумма квадратов, 2 — максимум. Ошибка —
> процедура.

```python
def error():
    print("Ошибка: неверный код операции!")

def operate(a, b, c, code):
    if code == 1:
        return a**2 + b**2 + c**2      # сумма квадратов
    elif code == 2:
        m = a                          # максимум без max()
        if b > m: m = b
        if c > m: m = c
        return m
    return None

code = int(input("1 - сумма квадратов, 2 - максимум: "))
res = operate(3, 5, 4, code)
if res is None:
    error()
else:
    print("Результат:", res)
```

### Вариант 9 (и 24)

> Функция преобразует каждый элемент списка в целое число. Вывод ошибки —
> процедура.

```python
def error(item):
    print(f"Ошибка: '{item}' нельзя преобразовать в целое число!")

def to_int_list(items):
    result = []
    for item in items:
        text = str(item).strip()
        if text.lstrip("-").isdigit():   # можно превратить в int
            result.append(int(text))
        else:
            error(item)                  # сообщаем о проблемном элементе
    return result

data = ["10", "  20", "abc", "-5", "3.5"]
print("Результат:", to_int_list(data))   # [10, 20, -5]
```

### Вариант 10 (и 25)

> Функция строит уравнение прямой (с угловым коэффициентом) по двум точкам.
> Вывод ошибки — процедура.

```python
def error():
    print("Ошибка: точки на одной вертикали, k не существует!")

def line_equation(x1, y1, x2, y2):
    if x1 == x2:                 # вертикаль: углового коэффициента нет
        error()
        return
    k = (y2 - y1) / (x2 - x1)    # угловой коэффициент
    b = y1 - k * x1              # свободный член
    print(f"y = {k}*x + {b}")

line_equation(0, 1, 2, 5)       # y = 2.0*x + 1.0
line_equation(3, 1, 3, 8)       # ошибка (вертикаль)
```

### Вариант 11 (и 26)

> Функция проверяет, является ли фраза палиндромом. Вывод ошибки — процедура.

```python
def error():
    print("Ошибка: пустая строка!")

def is_palindrome(phrase):
    # оставляем только буквы/цифры и приводим к нижнему регистру
    s = ""
    for ch in phrase.lower():
        if ch.isalnum():
            s += ch
    return s == s[::-1]          # сравниваем строку с её разворотом

phrase = input("Введите фразу: ")
if phrase.strip() == "":
    error()
elif is_palindrome(phrase):
    print("Это палиндром")
else:
    print("Не палиндром")
```

### Вариант 12 (и 27)

> «Функция в функции» для расчёта максимума 4 чисел. При вводе строки —
> процедура ошибки.

```python
def error():
    print("Ошибка: нужно ввести число!")

def find_max(a, b, c, d):
    def max2(x, y):              # вложенная функция
        return x if x > y else y
    return max2(max2(a, b), max2(c, d))

try:
    nums = [float(input(f"Число {i+1}: ")) for i in range(4)]
    print("Максимум:", find_max(*nums))
except ValueError:
    error()
```

### Вариант 13 (и 28)

> Функция считает количество чётных чисел в списке. Процедура сообщает о
> наличии данных другого типа.

```python
def warn(item):
    print(f"Внимание: '{item}' — не целое число, пропущено.")

def count_even(items):
    count = 0
    for item in items:
        if isinstance(item, int):    # только целые
            if item % 2 == 0:
                count += 1
        else:
            warn(item)               # данные другого типа
    return count

data = [1, 2, 4, "текст", 6, 3.5, 8]
print("Чётных:", count_even(data))   # 4, 6, 8 -> 3
```

### Вариант 14 (и 29)

> Функция находит делители целого положительного числа. Процедура сообщает о
> возможных ошибках ввода.

```python
def error():
    print("Ошибка: нужно целое положительное число!")

def divisors(n):
    result = []
    for i in range(1, n + 1):    # перебираем все от 1 до n
        if n % i == 0:           # делится без остатка -> делитель
            result.append(i)
    return result

text = input("Введите число: ")
if text.isdigit() and int(text) > 0:
    print("Делители:", divisors(int(text)))
else:
    error()
```

### Вариант 15 (и 30)

> Процедура принимает натуральные числа и выводит первые N чисел
> геометрической прогрессии. Не натуральное — процедура ошибки.

```python
def error():
    print("Ошибка: нужны натуральные числа!")

def geometric(b1, q, n):        # первый член, знаменатель, количество
    current = b1
    for _ in range(n):
        print(current, end=" ")
        current *= q
    print()

b1 = int(input("Первый член: "))
q = int(input("Знаменатель: "))
n = int(input("Сколько чисел: "))
if b1 < 1 or n < 1:
    error()
else:
    geometric(b1, q, n)
```
