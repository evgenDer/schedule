# Schedule

[Демо](https://schedule-team39.netlify.com/)

## Описание

Приложение для создания и отображения расписания rs-school. Выполнены различные проверки для вводимых данных<, что делает приложение удобным для пользования. Для удобства пользователя создан различные виды сортировок и фильтрации. Есть возможность редактирования задания в виде markdown файла.

## Используемые технологии при создании приложения

- TypeScript
- AntDesign
- Moment
- Html2canvas
- JsPdf
- React Markdown
- React-yandex-maps

## Основные компоненты

### В каждом файле компонента видны используемые внутри него свойства

1. Task <Task />
   Для создания модального окна с подробной информации о задании
2. SheduleTable <SheduleTable />
   Общий компонент для создания таблицы с заданием
3. StudentSheduleTable <StudentSheduleTable  />
   Компонент для создания таблицы студнта
4. OrganizerSheduleTable <OrganizerSheduleTable />
   Компонент для создания таблицы организатора
5. EditableTable <EditableTable />
   Для редактирования таблицы
6. Calendar <Calendar />
   Компонент для отображения расписания в виде календаря
7. ScheduleList <ScheduleList />
   Расписание в виде списка
8. UploaderImage <UploaderImage />
   Для загрузки картинки на страницу
9. UploaderVideo <UploaderVideo />
   Для загрузки видео на сраницу
10. InlineEdit <InlineEdit />
    Для редактирования строк в задании

## Интеграция

Для интеграции нужно добавить ссылку в приложение

## Хранение данных

Хранение данных осуществляется на сервере.

### Данные хранятся в слeдующем формате:

```js
interface RsSchoolEvent {
  id: string;
  tableData: IData; // для данных таблицы, списка, календаря
  taskData: ITaskData; // для подробной информации о задании
}

interface ITaskData {
  haveFeedback: boolean; // возможность оставить фидбек
  description: string; // описание
  materials: string; // материалы
  videoSrc: string; // ссылка на видео в ютубе
  imgSrc: string; // ссылка на картинку
  comments: CommentProps[]; // массив фидбеков
}

interface IData {
  key: string; // id для данных
  datetime: string; // для конвертации даты
  date: string; // для отображения даты
  time: string; // для отображения времени
  name: string; // название задания
  type: string; // id для типа задания
  mark: number; // оценка за задание
  coef: number; // коэффициент задания
  place: string; // место проведения
  broadcastUrl: string; // ссылка на трансляцию
  organizer: string; // гитхаб организатора мероприятия
  comment: string; // оставить комментарии по заданию
  isComplited: boolean; // показывает завершение задания
}
```

### Для типов задания предусмотрены свойства:

```js
interface ITaskType {
  id: string; // строка с айди типа задания
  name: string; // тип задания
  color: string; // цвет заднего фона
  fontColor: string; // цвет шрифта
  descriptionBackgroundColor: string; // цвет заднего фона описания
  descriptionFontColor: string; // цвет для шрифта описания
}
```
