import { RsSchoolEvent, ITaskType } from '../constants/types-interfaces';

class Services {
  url: string;
  team: string;

  constructor() {
    this.url = 'https://rs-react-schedule.firebaseapp.com/api';
    this.team = 'team/39';
  }

  public async getAllEvents() {
    const rawResponse = await fetch(`${this.url}/${this.team}/events`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (rawResponse.ok) {
      const content = await rawResponse.json();
      return content.data;
    }
    throw new Error(`${rawResponse.status}`);
  }

  public async getEvent(id: string) {
    if (id) {
      const rawResponse = await fetch(`${this.url}/${this.team}/event/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (rawResponse.ok) {
        const content = await rawResponse.json();
        return content;
      }
      throw new Error(`${rawResponse.status}`);
    }
  }

  public async addEvent(event: RsSchoolEvent) {
    try {
      const rawResponse = await fetch(`${this.url}/${this.team}/event`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  }

  public async updateEvent(event: RsSchoolEvent) {
    try {
      const rawResponse = await fetch(`${this.url}/${this.team}/event/${event.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  }

  public async deleteEvent(id: string) {
    try {
      const rawResponse = await fetch(`${this.url}/${this.team}/event/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  }

  public async getAllTaskTypes() {
    const rawResponse = await fetch(`${this.url}/${this.team}/organizers`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (rawResponse.ok) {
      const content = await rawResponse.json();
      return content.data;
    }
    throw new Error(`${rawResponse.status}`);
  }

  public async addTaskType(taskType: ITaskType) {
    try {
      const rawResponse = await fetch(`${this.url}/${this.team}/organizer`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(taskType),
      });
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  }

  public async getTaskType(id: string) {
    const rawResponse = await fetch(`${this.url}/${this.team}/organizer/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (rawResponse.ok) {
      const content = await rawResponse.json();
      return content;
    }
    throw new Error(`${rawResponse.status}`);
  }

  public async updateTaskType(taskType: ITaskType) {
    try {
      const rawResponse = await fetch(`${this.url}/${this.team}/organizer/${taskType.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(taskType),
      });
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  }

  public async deleteTaskType(id: string) {
    try {
      const rawResponse = await fetch(`${this.url}/${this.team}/organizer/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  }
}

const services = new Services();
export default services;
