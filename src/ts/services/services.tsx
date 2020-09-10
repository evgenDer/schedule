class Services {
    url: string;
    constructor() {
        this.url = 'https://rs-react-schedule.firebaseapp.com/api/';
    }
    async getAllEvents() {
        const rawResponse = await fetch(`${this.url}/team/26/events`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });
          const content = await rawResponse.json();
          return content.data;
    }
}