# Python с нуля

Курс по основам Python: типы данных, встроенные методы и практические примеры.
Собирается в сайт через [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)
и публикуется на GitHub Pages автоматически (GitHub Actions).

## Локальный запуск

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/Mac: source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Открой http://127.0.0.1:8000

## Структура

- `docs/` — уроки в Markdown
- `mkdocs.yml` — конфиг сайта и навигация
- `.github/workflows/deploy.yml` — сборка и деплой на GitHub Pages
