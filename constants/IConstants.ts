export type FormType = {
  [key: string]: string;
}

export interface IConstants {
  months: string[];
  days: string[];
  evaluationForm: FormType;
  subscriberForm: FormType;
  messageForm: FormType,
  projectsPage: {
    name: string,
    title: string,
    description: string
  };
  showcasePage: {
    name: string,
    title: string,
    description: string
  };
  homePage: {
    name: string,
    title: string,
    description: string
  };
  standards: any;
  formatDate(date: string): string;
  startLoader(self: Vue): void;
  finishLoader(self: Vue): void;
}
