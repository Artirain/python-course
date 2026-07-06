# Лаб 10. ООП

!!! abstract "Коротко о главном"
    **ООП** — программа как набор объектов. **Класс** — шаблон (свойства + методы),
    **объект** — конкретный экземпляр. 4 принципа: **абстракция**, **инкапсуляция**
    (скрытие данных), **наследование** (класс на основе другого), **полиморфизм**
    (один интерфейс — разные реализации).

## Конспект

### Класс, конструктор, методы

```python
class Person:
    def __init__(self, name):        # конструктор (вызывается при создании)
        self.name = name             # атрибут объекта
        self.age = 1

    def display_info(self):          # метод; self — ссылка на текущий объект
        print(f"Имя: {self.name}, возраст: {self.age}")

tom = Person("Tom")     # создание объекта
tom.age = 37            # доступ к атрибуту
tom.display_info()
```

### Инкапсуляция (приватные атрибуты + свойства)

```python
class Person:
    def __init__(self, name):
        self.__name = name       # приватный атрибут (два подчёркивания)
        self.__age = 1

    @property                    # геттер: чтение через obj.age
    def age(self):
        return self.__age

    @age.setter                  # сеттер: obj.age = ... с проверкой
    def age(self, value):
        if 1 < value < 110:
            self.__age = value
        else:
            print("Недопустимый возраст")

tom = Person("Tom")
tom.age = 25          # вызовется сеттер
print(tom.age)        # вызовется геттер -> 25
```

### Наследование и полиморфизм

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "Что-то говорит"

class Dog(Animal):               # Dog наследует Animal
    def speak(self):             # переопределяем метод
        return "Гав!"

class Cat(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # вызов конструктора родителя
        self.breed = breed
    def speak(self):
        return "Мяу!"

# Полиморфизм: у всех метод speak(), но реализация разная
for animal in [Dog("Рекс"), Cat("Барс", "сиамский")]:
    print(animal.speak())
```

## Задание

> Описать работу с классами согласно варианту. Продемонстрировать работу
> методов. Найди свой номер варианта в списке групп.

### Вариант 1 (8, 11, 21, 28) — средства передвижения

> Иерархия: средство передвижения (велосипед, автомобиль, грузовик). Поля:
> средняя скорость, модель, число пассажиров. Методы: расход топлива на
> расстояние, время в пути.

```python
class Vehicle:
    def __init__(self, model, speed, passengers, fuel_per_100km):
        self.model = model
        self.speed = speed              # средняя скорость, км/ч
        self.passengers = passengers
        self.fuel_per_100km = fuel_per_100km

    def fuel_for(self, distance):       # расход топлива на расстояние
        return distance / 100 * self.fuel_per_100km

    def travel_time(self, distance):    # время в пути, ч
        return distance / self.speed

class Bicycle(Vehicle):                 # велосипед: топлива нет
    def __init__(self, model, speed):
        super().__init__(model, speed, 1, 0)

class Car(Vehicle):
    pass

class Truck(Vehicle):
    pass

car = Car("Toyota", 90, 4, 8)
print(f"{car.model}: расход на 250 км = {car.fuel_for(250)} л")
print(f"время в пути = {car.travel_time(250):.1f} ч")
```

### Вариант 2 (9, 12, 22, 29) — человек

> Иерархия: человек (дошкольник, школьник, студент, работающий). Поля: ФИО,
> возраст, пол. Методы: средний доход, средний расход.

```python
class Human:
    def __init__(self, fio, age, gender):
        self.fio = fio
        self.age = age
        self.gender = gender
    def income(self):   return 0        # базовый доход
    def expense(self):  return 0        # базовый расход

class Preschooler(Human):
    def expense(self): return 5000      # переопределяем расход

class Student(Human):
    def income(self):  return 8000      # стипендия
    def expense(self): return 15000

class Worker(Human):
    def income(self):  return 60000
    def expense(self): return 40000

people = [Student("Иванов И.И.", 20, "м"), Worker("Петров П.П.", 35, "м")]
for p in people:
    print(f"{p.fio}: доход {p.income()}, расход {p.expense()}")
```

### Вариант 3 (10, 13, 23, 30) — геометрические фигуры

> Иерархия: фигуры (эллипс, квадрат, трапеция). Методы: площадь и периметр.

```python
import math

class Figure:                       # базовый класс с «абстрактными» методами
    def area(self):      pass
    def perimeter(self): pass

class Ellipse(Figure):
    def __init__(self, a, b):
        self.a, self.b = a, b       # полуоси
    def area(self):
        return math.pi * self.a * self.b
    def perimeter(self):            # приближённая формула Рамануджана
        return math.pi * (3*(self.a+self.b) - math.sqrt((3*self.a+self.b)*(self.a+3*self.b)))

class Square(Figure):
    def __init__(self, side):
        self.side = side
    def area(self):      return self.side ** 2
    def perimeter(self): return 4 * self.side

class Trapezoid(Figure):
    def __init__(self, a, b, c, d, height):
        self.a, self.b, self.c, self.d, self.h = a, b, c, d, height
    def area(self):      return (self.a + self.b) / 2 * self.h
    def perimeter(self): return self.a + self.b + self.c + self.d

for fig in [Ellipse(3, 2), Square(4), Trapezoid(6, 4, 3, 3, 2)]:
    print(f"{type(fig).__name__}: S={fig.area():.2f}, P={fig.perimeter():.2f}")
```

### Вариант 4 (14, 18, 24) — функция одной переменной

> Иерархия: функция от одной переменной (синус, косинус, x³). Методы: значение
> функции и производной в точке.

```python
import math

class Function:
    def value(self, x):      pass
    def derivative(self, x): pass

class Sin(Function):
    def value(self, x):      return math.sin(x)
    def derivative(self, x): return math.cos(x)      # (sin)' = cos

class Cos(Function):
    def value(self, x):      return math.cos(x)
    def derivative(self, x): return -math.sin(x)     # (cos)' = -sin

class Cube(Function):
    def value(self, x):      return x ** 3
    def derivative(self, x): return 3 * x ** 2       # (x^3)' = 3x^2

x = 1.0
for f in [Sin(), Cos(), Cube()]:
    print(f"{type(f).__name__}: f({x})={f.value(x):.3f}, f'({x})={f.derivative(x):.3f}")
```

### Вариант 5 (15, 19, 25) — мебель / стол

> Класс «Мебель» (Марка, Название, Цена) с методом вывода. Наследник «Стол» с
> полями «Спинка» (True/False), «Кол-во ножек».

```python
class Furniture:
    def __init__(self, brand, name, price):
        self.brand = brand
        self.name = name
        self.price = price
    def info(self):
        print(f"{self.brand} {self.name}, цена {self.price} руб.")

class Table(Furniture):
    def __init__(self, brand, name, price, has_back, legs):
        super().__init__(brand, name, price)   # поля родителя
        self.has_back = has_back               # спинка
        self.legs = legs                       # кол-во ножек
    def info(self):                            # переопределяем вывод
        super().info()
        back = "есть" if self.has_back else "нет"
        print(f"  спинка: {back}, ножек: {self.legs}")

Table("IKEA", "Стол письменный", 7000, False, 4).info()
```

### Вариант 6 (16, 20, 26) — книги

> Класс `Book` (Автор, Название, Издательство, Год, Кол-во страниц). Массив
> объектов. Выборки: по автору, по издательству, после года. 2 дочерних класса.

```python
class Book:
    def __init__(self, author, title, publisher, year, pages):
        self.author = author
        self.title = title
        self.publisher = publisher
        self.year = year
        self.pages = pages
    def info(self):
        return f"{self.author}. {self.title} ({self.publisher}, {self.year})"

class EBook(Book):                 # электронная книга
    def __init__(self, *args, fmt="PDF"):
        super().__init__(*args)
        self.fmt = fmt

class PaperBook(Book):             # бумажная книга
    def __init__(self, *args, cover="твёрдая"):
        super().__init__(*args)
        self.cover = cover

books = [
    Book("Лутц", "Изучаем Python", "Вильямс", 2020, 1600),
    Book("Лутц", "Программирование", "Вильямс", 2011, 990),
    EBook("Матиз", "Ускоренный курс", "Питер", 2021, 500),
]

author = "Лутц"
print("Книги автора", author)
for b in books:
    if b.author == author:              # выборка по автору
        print(" ", b.info())

print("Книги после 2015 года:")
for b in books:
    if b.year > 2015:                   # выборка по году
        print(" ", b.info())
```

### Вариант 7 (17, 27) — корреспонденция

> Класс «Корреспонденция» (Дата, Тема, Отправитель) с методом вывода.
> Наследники «Электронное письмо» и «Бумажное письмо».

```python
class Correspondence:
    def __init__(self, date, subject, sender):
        self.date = date
        self.subject = subject
        self.sender = sender
    def info(self):
        print(f"[{self.date}] {self.subject} от {self.sender}")

class Email(Correspondence):
    def __init__(self, date, subject, sender, email):
        super().__init__(date, subject, sender)
        self.email = email
    def info(self):
        super().info()
        print(f"  e-mail: {self.email}")

class PaperLetter(Correspondence):
    def __init__(self, date, subject, sender, address):
        super().__init__(date, subject, sender)
        self.address = address
    def info(self):
        super().info()
        print(f"  адрес: {self.address}")

Email("2026-07-06", "Отчёт", "Иванов", "ivanov@mail.ru").info()
PaperLetter("2026-07-05", "Договор", "ООО Ромашка", "г. Пермь").info()
```
