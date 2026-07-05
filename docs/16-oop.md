# 16. ООП (классы и объекты)

Объектно-ориентированное программирование позволяет объединять данные и
поведение в один «объект».

## Класс и объект

Класс — это чертёж. Объект — конкретный экземпляр по этому чертежу.

```python
class Dog:
    def __init__(self, name, age):
        self.name = name        # атрибуты объекта
        self.age = age

    def bark(self):             # метод
        return f"{self.name} говорит: Гав!"

# создаём объекты
rex = Dog("Рекс", 3)
bella = Dog("Белла", 5)

print(rex.name)         # Рекс
print(rex.bark())       # Рекс говорит: Гав!
print(bella.age)        # 5
```

### Что здесь что

- `__init__` — конструктор, вызывается при создании объекта;
- `self` — ссылка на сам объект (первый параметр любого метода);
- `self.name` — атрибут, хранится в объекте;
- `bark` — метод (функция внутри класса).

## Атрибуты класса vs объекта

```python
class Dog:
    species = "собака"          # атрибут класса — общий для всех

    def __init__(self, name):
        self.name = name        # атрибут объекта — свой у каждого

print(Dog.species)              # собака
rex = Dog("Рекс")
print(rex.species)              # собака (унаследован от класса)
print(rex.name)                 # Рекс
```

## Методы и работа с состоянием

```python
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

    def reset(self):
        self.count = 0

c = Counter()
c.increment()
c.increment()
print(c.count)          # 2
c.reset()
print(c.count)          # 0
```

## Магические методы (dunder)

Методы с двойным подчёркиванием переопределяют поведение объекта.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):              # как объект печатается
        return f"Point({self.x}, {self.y})"

    def __eq__(self, other):        # как сравниваются ==
        return self.x == other.x and self.y == other.y

p = Point(1, 2)
print(p)                    # Point(1, 2)
print(Point(1, 2) == Point(1, 2))   # True
```

| Метод | Отвечает за |
|-------|-------------|
| `__init__` | создание объекта |
| `__str__` | `print(obj)` и `str(obj)` |
| `__repr__` | отладочное представление |
| `__eq__` | сравнение `==` |
| `__len__` | `len(obj)` |
| `__lt__`, `__gt__` | сравнения `<`, `>` |

## Наследование

Класс может наследовать поведение другого класса.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):              # Dog наследует Animal
    def speak(self):            # переопределяем метод
        return "Гав!"

class Cat(Animal):
    def speak(self):
        return "Мяу!"

for animal in [Dog("Рекс"), Cat("Мурка")]:
    print(f"{animal.name}: {animal.speak()}")
# Рекс: Гав!
# Мурка: Мяу!
```

### super() — вызов родителя

```python
class Person:
    def __init__(self, name):
        self.name = name

class Employee(Person):
    def __init__(self, name, salary):
        super().__init__(name)      # вызвать конструктор родителя
        self.salary = salary

e = Employee("Аня", 100000)
print(e.name, e.salary)             # Аня 100000
```

## Инкапсуляция (условная приватность)

Подчёркивание перед именем — договорённость «это внутреннее, не трогай снаружи».

```python
class Account:
    def __init__(self):
        self._balance = 0        # _ = «приватное» (по соглашению)

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def get_balance(self):
        return self._balance

acc = Account()
acc.deposit(500)
print(acc.get_balance())         # 500
```

## Когда использовать классы

- Есть сущность с состоянием + действиями над ним (пользователь, заказ, игра).
- Много похожих объектов с общим поведением.

Для простых задач часто хватает функций и словарей — не усложняй без нужды.

## Попробуй сам

1. Класс `Rectangle(width, height)` с методом `area()`.
2. Класс `BankAccount` с методами `deposit` и `withdraw` (не уходить в минус).
3. Базовый класс `Shape` и наследники `Circle`, `Square` со своим `area()`.
4. Добавь `__str__`, чтобы объект красиво печатался.

??? success "Показать решения"

    ```python
    # 1
    class Rectangle:
        def __init__(self, width, height):
            self.width = width
            self.height = height
        def area(self):
            return self.width * self.height

    # 2
    class BankAccount:
        def __init__(self):
            self.balance = 0
        def deposit(self, amount):
            self.balance += amount
        def withdraw(self, amount):
            if amount > self.balance:
                print("Недостаточно средств")
            else:
                self.balance -= amount

    # 3
    class Shape:
        def area(self):
            return 0

    class Circle(Shape):
        def __init__(self, r):
            self.r = r
        def area(self):
            return 3.14159 * self.r ** 2

    class Square(Shape):
        def __init__(self, side):
            self.side = side
        def area(self):
            return self.side ** 2

    # 4
    class Point:
        def __init__(self, x, y):
            self.x = x
            self.y = y
        def __str__(self):
            return f"Point({self.x}, {self.y})"
    ```
