# План в стиле Tesler: Первый инкремент (Menu + Screen)

## Цель

Собрать первый production-grade срез приложения в стиле Tesler:

- загрузить метаданные приложения с бэкенда,
- динамически отрисовать меню из метаданных,
- реализовать явный navigation flow `screen -> view`,
- корректно загрузить и отрисовать shell первой screen/view.

Этот план намеренно не опирается на текущую реализацию и описывает целевую архитектуру "как должно быть правильно".

---

## Границы первого инкремента

## Входит в scope

- Проектирование API-контрактов для bootstrap meta и view meta.
- Frontend route-модель с явным `screen -> view`.
- State-модель для app meta, active screen, active view.
- Динамическая отрисовка меню и screen shell.
- Базовое поведение ошибок/fallback.
- Тестовая стратегия для этого инкремента.

## Не входит в scope (пока)

- Полноценный widget engine (поведение list/form).
- CRUD-операции и operation pipelines.
- Force-active, mutation row-meta, глубокая логика BC-иерархий.
- Role switching и продвинутая авторизация.
- Offline cache и optimistic updates.

---

## Архитектурные принципы

1. **Route — источник истины** для выбранных screen/view.
2. **Явный контекст:** каждый view принадлежит конкретному screen.
3. **Детерминированные backend-контракты:** без двусмысленного поиска только по `viewName`.
4. **Metadata-driven UI:** меню и заголовки страниц берутся из backend metadata, не хардкодятся.
5. **Строгая валидация границ:** backend валидирует route context, frontend валидирует params до рендера.
6. **Инкрементальная сложность:** сначала menu + screen shell, потом runtime виджетов.

---

## Каноническая доменная модель (Инкремент 1)

## Базовые сущности

- `ServiceMeta`: app-level metadata + список доступных screens.
- `ScreenMeta`: navigation + список views внутри одного screen.
- `ViewMetaSummary`: идентификатор view, title, url.
- `ViewPayload`: полный payload выбранного view (datamodel + businessComponents slice).

## Ключи и идентичность

- `serviceKey` (string): контекст окружения/сервиса.
- `screenName` (string): уникален внутри сервиса.
- `viewName` (string): уникален минимум внутри screen (желательно глобально уникален, но не полагаться на это).

---

## Дизайн Backend API (Target)

## Метод 1: Bootstrap Meta

**RPC method:** `player.getMeta`  
**Request params:**

- `service: string`

**Response `result`:**

- `name`, `header`, `footer`
- `screens: ScreenSummary[]`

Каждый `ScreenSummary` включает:

- `name`
- `title`
- `default` (boolean)
- `primaryViewName`
- `navigation.menu`
- `views[]` (`name`, `title`, `url`)

Зачем: frontend может отрисовать меню и резолвить view titles без дополнительных запросов.

## Метод 2: View Payload

**RPC method:** `player.getView`  
**Request params:**

- `service: string`
- `screen: string`
- `view: string`

**Response `result`:**

- `screenName`
- `viewName`
- `datamodel`
- `businessComponents` (ограниченные выбранным screen/view)

Зачем: явный `screen -> view` убирает двусмысленность и соответствует Tesler flow.

## Контракт ошибок

Стандартный JSON-RPC error object со стабильными кодами:

- `SCREEN_NOT_FOUND`
- `VIEW_NOT_FOUND`
- `VIEW_NOT_IN_SCREEN`
- `SERVICE_NOT_FOUND`
- `INVALID_PARAMS`

Плюс `details` для observability (`service`, `screen`, `view`, trace id).

---

## Дизайн Frontend Routing (Target)

## Маршруты

- `/` -> редирект на default `{screen}/{view}`
- `/screen/:screenName` -> редирект на `primaryViewName` соответствующего screen
- `/screen/:screenName/view/:viewName` -> рендер view shell

## Route Guards

1. Проверить, что app meta загружена.
2. Проверить, что `screenName` существует в meta.
3. Проверить/резолвить `viewName` внутри выбранного screen.
4. Нормализовать route (редирект при partial/invalid состоянии).

---

## Дизайн Frontend State (Target)

## Store A: AppMetaStore

Хранит:

- `serviceMeta` (`name`, `header`, `footer`)
- `screens[]`
- `activeScreenName`

Действия:

- `setMeta(payload)`
- `setActiveScreen(screenName)`
- `getScreenByName(name)`
- `getDefaultScreen()`

## Store B: ViewStore

Хранит:

- `activeViewName`
- `activeViewPayload`

Действия:

- `setActiveView(viewName)`
- `setViewPayload(payload)`
- `clearView()`

---

## UI-композиция (Инкремент 1)

## App Shell

- Глобальный header/footer из `ServiceMeta`.
- Левое/верхнее меню из `navigation.menu` активного screen.

## Правила рендера меню

- Group-узлы: `title + child[]`.
- Leaf-узлы: `viewName` (display title резолвится через `views[]` выбранного screen).
- Поведение клика: `router.push` с обоими параметрами: `screenName` и `viewName`.

## Screen/View Shell

- Заголовок страницы из `ViewMetaSummary.title`.
- Временный body-placeholder (до внедрения widget runtime).
- Опционально debug panel в dev: `service/screen/view`.

---

## Последовательность загрузки данных

1. Приложение стартует.
2. Вызывается `player.getMeta(service)`.
3. Метаданные сохраняются, вычисляется default route.
4. Route стабилизируется в `/screen/:screen/view/:view`.
5. Вызывается `player.getView(service, screen, view)`.
6. Payload сохраняется, рендерится screen shell.

На каждое изменение route:

- Если сменился screen: обновить active screen context.
- Запросить view payload для новой пары `(screen, view)`.

---

## План реализации Backend (по шагам)

1. Определить DTO для `ServiceMeta`, `ScreenSummary`, `ViewMetaSummary`, `ViewPayload`.
2. Реализовать handler `player.getMeta` со schema validation.
3. Реализовать handler `player.getView` с явной проверкой `(service, screen, view)`.
4. Добавить deterministic resolver layer:
   - resolve service,
   - resolve screen,
   - resolve view в screen.
5. Добавить JSON-RPC error mapping.
6. Добавить contract tests на happy path и все not-found кейсы.

---

## План реализации Frontend (по шагам)

1. Определить типизированные API методы для `getMeta` и `getView`.
2. Создать `AppMetaStore` и `ViewStore` (functional style).
3. Реализовать route schema и guards.
4. Собрать menu component из screen navigation.
5. Подключить click -> route transition.
6. Реализовать `ViewPage` shell на основе загруженного payload.
7. Добавить базовые loading/error boundary components.
8. Добавить integration tests (route -> request -> render).

---

## План валидации и тестирования

## Backend

- Unit tests для resolver-ов (`service/screen/view`).
- Contract tests для JSON-RPC ответов.
- Negative tests для всех error code.

## Frontend

- Unit tests: menu mapper, route resolver.
- Integration tests:
  - bootstrap на `/`,
  - route redirects,
  - click по menu -> меняется URL -> улетает запрос за view payload.

## E2E (минимум)

- Открытие приложения -> меню видно.
- Клик по плитке -> URL содержит `screen` + `view`.
- Рендерится screen shell с ожидаемым title.

---

## Нефункциональные требования для этого инкремента

- Понятная телеметрия route и RPC ошибок.
- Детерминированные request IDs для трассировки.
- Без "тихих" fallback при invalid route context.
- Строгая TypeScript-типизация на API-границах.
- Консистентное versioning JSON schema payload-ов.

---

## Milestones

## Milestone A: Фиксация контракта

- Финализировать JSON-RPC request/response schemas.
- Заморозить error codes.

## Milestone B: End-to-end skeleton

- Приложение стартует, меню рендерится, route меняется, view shell загружается.

## Milestone C: Стабилизация

- Базовый уровень test coverage.
- Финализация логирования и error boundaries.

---

## Deliverables для “старта”

1. Согласованные API schemas (`getMeta`, `getView`).
2. Документ со спецификацией route.
3. Контракты store (`AppMetaStore`, `ViewStore`).
4. Первый end-to-end demo flow menu -> screen shell.
5. Чеклист тестов и acceptance criteria.

---

## Acceptance Criteria (Инкремент 1)

- Приложение стартует и один раз запрашивает metadata.
- Меню полностью metadata-driven.
- Клик по пункту меню меняет route на явный `screen/view`.
- Для нового route уходит запрос за payload с `service+screen+view`.
- Screen shell рендерится по данным ответа.
- Invalid route приводит к контролируемому error/redirect поведению.

