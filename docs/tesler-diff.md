# Расхождения: `MasterServiceMeta.json` ↔ пакет `test` (`@tesler-ui-crm/schema`)

Источники:

- Схема: `/Users/alexander/Desktop/Work/Projects/MVD/MASTER_SERVICE/MasterServiceMeta.json` (JSON Schema, `definitions.*`).
- Типы: `/Users/alexander/Desktop/Work/Projects/MVD/MASTER_SERVICE/test` (исходники `src/**/*.ts`, публикуемые декларации в `dist/**/*.d.ts`).

Ниже — только **расхождения между этими двумя артефактами** (не сравнение с вашим mock-бэком или `new-mvd`).

---

## 1. Экран (`Screen` в Meta vs `ScreenMetaJson` в test)

1. **`primaryViews`**
   - **MasterServiceMeta** (`definitions.Screen.properties.primaryViews`): массив полных объектов **`View`** (каждый с `name`, `title`, `url`, `widgets` и т.д.).
   - **test** (`ScreenMetaJson` в `src/files/ScreenMeta.ts` / `dist/files/ScreenMeta.d.ts`): **`primaryViews: string[]`**, в комментарии указано **«Not used»**.
   - **Итог:** семантика и тип элемента массива **не совпадают** (объекты `View` vs массив строк).

2. **`roles` на экране**
   - **MasterServiceMeta** (`Screen`): есть свойство **`roles`** (массив ролей).
   - **test** (`ScreenMetaJson`): поля **`roles` нет** — в интерфейсе экрана из `*.screen.json` оно не описано.

3. **Состав полей в целом**
   - **MasterServiceMeta** описывает **`Screen`** как часть доменной меты (BC, полный граф view).
   - **test** описывает **файл `*.screen.json`** — урезанный контракт под клиентский формат; **`SessionScreen`** / ответ логина в test **не** дублируются в `ScreenMetaJson`.

---

## 2. Представление (`View` в Meta vs `ViewMetaJson` в test)

4. **`widgets`: один плейсмент vs массив в реальных JSON**
   - **MasterServiceMeta** (`definitions.View.properties.widgets`): одно значение **`anyOf(ViewMetaWidgetLegacy | ViewMetaWidget)`** (в схеме **не** объявлено как `array`).
   - **test** (`ViewMetaJson.widgets`): один объект **`ViewMetaWidget`** (`ViewMetaWidgetLegacy | ViewMetaWidgetNew`).
   - **Итог:** в **обоих** формальных описаниях — **один** дескриптор виджета на поле `widgets`; если в проекте встречается **массив** виджетов на view, это уже **расхождение с обоими** источниками (практика vs схема/тип).

5. **Legacy-виджет на view: идентификация**
   - **MasterServiceMeta** (`ViewMetaWidgetLegacy`): **`widgetName`** + вложенный **`widget`** (ссылка на `WidgetLegacy` / встроенная мета).
   - **test** (`ViewMetaWidgetLegacy`): устаревший вариант с **`widgetId: number`** (ссылка на `id` в `*.widget.json`), **`widgetName`** в этом legacy-варианте **нет**.
   - **Итог:** разные модели привязки виджета к мете.

6. **Конструкторский виджет на view (`ViewMetaWidget` vs `ViewMetaWidgetNew`)**
   - **MasterServiceMeta** (`ViewMetaWidget`): **`widgetName`** + вложенный **`widget`** → **`WidgetMeta`**.
   - **test** (`ViewMetaWidgetNew`): только **`widgetName`** (строка); полное тело виджета в типе **вне** placement — ожидается отдельный **`*.widget.json`** (`WidgetMetaJson`), без вложенного `widget` в placement-типе.
   - **Итог:** в Master вид **инлайнит** `WidgetMeta` внутрь view; в test — **ссылка по имени** + внешний файл.

---

## 3. Мета виджета (`WidgetMeta` в Meta vs `WidgetMetaJson` в test)

7. **Привязка к БК**
   - **MasterServiceMeta** (`WidgetMeta`): обязательное поле **`boSystemId`** (строка, ссылка на `MetaBoSystem.system_id` по описанию).
   - **test** (`WidgetMetaJsonBase`): обязательное поле **`bc`** (имя бизнес-компонента).
   - **Итог:** **разные имена и смысл** поля (system id vs `bc`).

8. **Идентификатор виджета**
   - **MasterServiceMeta** (`WidgetMeta`): обязательный числовой **`id`**.
   - **test**: union **`WidgetMetaJsonNumber`** (`id: number`) и **`WidgetMetaJsonString`** (`name: string`) — допускается строковый идентификатор **`name`**, которого **нет** в ветке `WidgetMeta` Master как обязательной альтернативы в одном объекте.

---

## 4. Навигация (`ViewNavigationGroup` / `ViewNavigationItem`)

9. **`ViewNavigationCategory`**
   - **test** (`interfaces/navigation`): есть устаревший тип **`ViewNavigationCategory`** и union **`MenuItem`** с этой веткой.
   - **MasterServiceMeta**: в просмотренных `definitions` **нет** аналога `ViewNavigationCategory` / `categoryName` (меню в `navigation.menu` задаётся через `ViewNavigationGroup` и пункт с обязательным `viewName`).

10. **Пункт меню с `viewName`**
    - **MasterServiceMeta** (`navigation.menu`): для ссылки на view используется комбинация **`Pick<ViewNavigationItem, …>` + `allOf` с обязательным `viewName`**.
    - **test**: для элементов меню без deprecated-полей используется **`ViewNavigationItemNew`** = `Omit<ViewNavigationItem, 'id'> & { viewName: string }` — **`viewName` обязателен** в новом варианте; в базовом **`ViewNavigationItem`** поле **`viewName` опционально**.
    - **Итог:** строгость **`viewName`** формально различается между «сырым» `ViewNavigationItem` и тем, что ожидается в `ScreenMetaJson.menu` / в Master для пункта меню.

---

## 5. Замечание только к `MasterServiceMeta.json` (не расхождение с test, но полезно знать)

11. **`WidgetLegacy.required`**
    - В **`definitions.WidgetLegacy.required`** указано **`"iuiComponentName"`**, тогда как в **`properties`** поле называется **`uiComponentName`**. Похоже на **опечатку в схеме** Master (несогласованность имён внутри одного файла).

---

## Как пользоваться этим файлом

- При изменении контракта API или mock-JSON сверяйте не только **MasterServiceMeta**, но и **`test/dist/*.d.ts`**: для экрана в первую очередь расхождение **`primaryViews`** (п. 1).
- Если нужна **полная** алиния с Master по экрану, тип **`ScreenMetaJson` из test сам по себе недостаточен** — он описывает другой слой (файл экрана), а не полный `Screen` из Master.
