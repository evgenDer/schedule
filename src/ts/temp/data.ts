interface RsSchoolEvent {
    "id": string,
    "name": string,
    "description": string,
    "descriptionUrl": string,
    "type": string,
    "timeZone": string,
    "dateTime": string,
    "place": string,
    "comment": string,
}

const RsSchoolEvent1: RsSchoolEvent = {
    "id": "event1",
    "name": "Markdown & Git",
    "description": "",
    "descriptionUrl": "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/git-markdown.md",
    "type": "cv:markdown",
    "timeZone": "Asia/Tashkent",
    "dateTime": "2020-09-04T10:24:00",
    "place": "",
    "comment": "",
}

const RsSchoolEvent2: RsSchoolEvent = {
    "id": "event2",
    "name": "HTML, CSS & Git Basics",
    "description": "You need to create index.html page and styles for it. Main content of this page is Markdown document from last task Git & Markdown",
    "descriptionUrl": "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/codejam-cv.md",
    "type": "cv:html",
    "timeZone": "Europe/Minsk",
    "dateTime": "2020-09-17T05:13:00",
    "place": "",
    "comment": "",
};

const RsSchoolEvent3: RsSchoolEvent = {
    "id": "event3",
    "name": "HTML, CSS & Git Basics",
    "description": "Нужно завершить стилизацию стилизацию cv на основе ранее созданного файла index.html",
    "descriptionUrl": "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/codejam-cv.md",
    "type": "html task",
    "timeZone": "Europe/Minsk",
    "dateTime": "2020-09-18T05:13:00",
    "place": "",
    "comment": "",
}

const RsSchoolEvent4: RsSchoolEvent = {
    "id": "event4",
    "name": "HTML, CSS & Git Basics",
    "description": "Добавление адаптивного дизайна к cv с использованием медиазапросов",
    "descriptionUrl": "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/simple-singolo.md",
    "type": "html task",
    "timeZone": "Europe/Minsk",
    "dateTime": "2020-09-19T05:13:00",
    "place": "",
    "comment": "",
}

const RsSchoolEvent5: RsSchoolEvent = {
    "id": "event5",
    "name": "simple-singolo",
    "description": "Сверстать страницу согласно макету. Использовать JavaScript для создания адаптивного меню, слайдера, переключения табов в блоке Portfolio.",
    "descriptionUrl": "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/codejam-cv.md",
    "type": "html task",
    "timeZone": "Europe/Minsk",
    "dateTime": "2020-09-19T05:13:00",
    "place": "",
    "comment": "",
}

const RsSchoolEvent6: RsSchoolEvent = {
    "id": "event6",
    "name": "Codewars Basic",
    "description": "Выполнить задачи, указанные в списке",
    "descriptionUrl": "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/codewars-basic.md",
    "type": "codewars",
    "timeZone": "Europe/Minsk",
    "dateTime": "2020-09-20T10:24:00",
    "place": "",
    "comment": "",
}

function getScheduleData(): object {
    return {
        "data": [
            RsSchoolEvent1,
            RsSchoolEvent2,
            RsSchoolEvent3,
            RsSchoolEvent4,
            RsSchoolEvent5,
            RsSchoolEvent6, 
        ]
    }
}

export default getScheduleData;
