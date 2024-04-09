## Структура проекта

### markup

В директории находится вёрстка проекта: примеры страниц, ui-kit и карта сайта (`sitemap.html`). Начинать знакомство с проектом лучше с карты.

### frontend

Директория для фронтенда проекта.

#### backend

Директория для бэкенда проекта.

## Запуск проекта

### Бэкенд

1. Перейдите в директорию `backend`.

2. Установите зависимости: `npm install`.

3. Создайте `.env` файл с переменными окружения. Пример находиться в файле `.env.example`.

4. Запустите docker контейнер с базой данных: `npm run db`.

5. Запустите приложения: `npm run start:dev`.

## Дополнительный функционал

- Маршрут для запуска рассылки уведомлений на почту: `http://localhost:3000/subscribe/dispatch`. (subscriber.http)

- Маршрут для создания моковых данных: `http://localhost:3000/mocks`. (mock.http)

- Спецификация доступна по адресу: `http://localhost:3000/spec`.
