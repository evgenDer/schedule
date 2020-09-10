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
          return content.data;
    }

    public async getEvent(id: string) {
        const rawResponse = await fetch(`${this.url}/team/26/event/${id}`, {
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
            },
            body: JSON.stringify(event),
        });
        console.log(rawResponse);
    }

}
const services = new Services;
export default services;