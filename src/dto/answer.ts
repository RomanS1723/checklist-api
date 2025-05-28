export enum AnswerType {
  CORRECT = 'correct',
  DESCRIPTION = 'description',
  COUNT = 'count',
}

export class Answer {
  id?: number;
  type: AnswerType;
  onBeforeStart: boolean;
  fieldDescription?: string;
  correct?: boolean;
  description?: string;
  count?: number;
}
