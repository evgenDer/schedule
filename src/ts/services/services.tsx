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

class Services {
    url: string;
    constructor() {
        this.url = 'https://rs-react-schedule.firebaseapp.com/api';
    }
    public async getAllEvents() {
        const rawResponse = await fetch(`${this.url}/team/39/events`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });
          const content = await rawResponse.json();
          return content.data.filter((el: RsSchoolEvent) => el.name && el.type);
    }

    public async getEvent(id: string) {
        const rawResponse = await fetch(`${this.url}/team/39/event/${id}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });
          const content = await rawResponse.json();
          return content;
    }

    public async addEvent(event: object) {
        const rawResponse = await fetch(`${this.url}/team/39/event`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(event),
        });
    }

    public async updateEvent(event: RsSchoolEvent) {
        const rawResponse = await fetch(`${this.url}/team/39/event/${event.id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(event),
        });
    }

    public async deleteEvent(id: string) {
        const rawResponse = await fetch(`${this.url}/team/39/event/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
            },
        });
    }

    public async getAllOrganizers() {
        const rawResponse = await fetch(`${this.url}/team/39/organizers`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });
        const content = await rawResponse.json();
        return content.data;
    }

    public async addOrganizer(organizer: object) {
        const rawResponse = await fetch(`${this.url}/team/39/organizer`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(organizer),
        });
    }

    public async getOrganizer(id: string) {
        const rawResponse = await fetch(`${this.url}/team/39/organizer/${id}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });
          const content = await rawResponse.json();
          return content;
    }
}
const services = new Services;
export default services;