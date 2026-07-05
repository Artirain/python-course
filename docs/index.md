---
hide:
  - navigation
  - toc
---

<div class="hero" markdown>
  <div class="hero-copy" markdown>

# Научись писать<br>код на <span class="accent">Python</span>

Бесплатный курс по основам с нуля. Коротко о теории, таблицы всех встроенных
методов и запускаемые примеры — чтобы после каждого урока ты уже **писал код**,
а не просто читал про него.

<div class="hero-badges">
  <span>17 уроков</span>
  <span>6 мини-проектов</span>
  <span>шпаргалка</span>
  <span>с полного нуля</span>
</div>

[Начать урок 1 →](01-intro.md){ .md-button }
[Шпаргалка](cheatsheet.md){ .md-button .md-button--ghost }

  </div>

  <div class="editor" aria-hidden="true">
    <div class="editor__bar">
      <i class="r"></i><i class="y"></i><i class="g"></i>
      <span class="name">hello.py — python 3</span>
    </div>
<div class="editor__body"><span class="prompt">&gt;&gt;&gt;</span> <span class="kw">def</span> <span class="fn">greet</span>(name):
<span class="prompt">...</span>     <span class="kw">return</span> <span class="str">f"Привет, {name}!"</span>
<span class="prompt">&gt;&gt;&gt;</span> greet(<span class="str">"мир"</span>)
<span class="out">'Привет, мир!'</span>
<span class="prompt">&gt;&gt;&gt;</span> [w.<span class="fn">upper</span>() <span class="kw">for</span> w <span class="kw">in</span> <span class="str">"учи python"</span>.<span class="fn">split</span>()]
<span class="out">['УЧИ', 'PYTHON']</span>
<span class="prompt">&gt;&gt;&gt;</span> <span class="cur"></span></div>
  </div>
</div>

## С чего начать

<div class="grid cards" markdown>

-   :material-rocket-launch:{ .lg .middle } __Новичок с полного нуля__

    ---

    Не писал код раньше? Иди по порядку — с установки Python и первой программы.

    [:octicons-arrow-right-24: Урок 1. Введение](01-intro.md)

-   :material-format-text:{ .lg .middle } __Пришёл за методами строк__

    ---

    `upper`, `lower`, `split`, `join`, `strip` и все остальные — с таблицами и примерами.

    [:octicons-arrow-right-24: Урок 3. Строки](03-strings.md)

-   :material-lightning-bolt:{ .lg .middle } __Нужна быстрая справка__

    ---

    Весь синтаксис и главные методы на одной странице — чтобы подсмотреть за секунду.

    [:octicons-arrow-right-24: Шпаргалка](cheatsheet.md)

-   :material-tools:{ .lg .middle } __Хочу сразу практику__

    ---

    Мини-проекты с полными решениями: угадай число, калькулятор, список дел.

    [:octicons-arrow-right-24: Мини-проекты](projects.md)

</div>

## Программа курса

<div class="grid cards" markdown>

-   :material-book-open-variant:{ .lg .middle } __Основы__

    ---

    Синтаксис, переменные, типы данных, строки и числа — фундамент языка.

    [1. Введение](01-intro.md) ·
    [2. Типы](02-variables-types.md) ·
    [3. Строки](03-strings.md) ·
    [4. Числа](04-numbers.md)

-   :material-view-list:{ .lg .middle } __Коллекции__

    ---

    Как хранить наборы данных: списки, кортежи, словари и множества.

    [5. Списки](05-lists.md) ·
    [6. Кортежи](06-tuples.md) ·
    [7. Словари](07-dicts.md) ·
    [8. Множества](08-sets.md)

-   :material-sitemap:{ .lg .middle } __Логика и функции__

    ---

    Условия, циклы, свои функции и компактные comprehensions.

    [9. Условия](09-conditions.md) ·
    [10. Циклы](10-loops.md) ·
    [11. Функции](11-functions.md) ·
    [12. Comprehensions](12-comprehensions.md)

-   :material-school:{ .lg .middle } __Дальше__

    ---

    Ошибки, файлы, модули, ООП и полезное из стандартной библиотеки.

    [13. Исключения](13-exceptions.md) ·
    [14. Файлы](14-files.md) ·
    [15. Модули](15-modules.md) ·
    [16. ООП](16-oop.md) ·
    [17. stdlib](17-stdlib.md)

</div>

## Как учиться, чтобы получилось

!!! tip "Три правила"
    1. **Набирай примеры руками**, а не копируй — так код запоминается.
    2. После каждого урока делай блок «Попробуй сам».
    3. Дошёл до конца — бери [мини-проект](projects.md) и доводи до рабочего состояния.

!!! info "Как запускать код"
    Сохрани код в файл `example.py` и в терминале выполни:
    ```bash
    python example.py
    ```
    Или экспериментируй в интерактивном режиме — набери `python` и жми ++enter++.

---

Готов? Открывай [Урок 1. Введение](01-intro.md) 🚀
{ .md-typeset style="text-align:center; opacity:.7" }
