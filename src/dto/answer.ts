export enum AnswerType {
  CORRECT = 'correct',
  DESCRIPTION = 'description',
  COUNT = 'count',
}

export class Answer {
  id?: number;
  type: AnswerType;
  fieldDescription?: string;
  correct?: boolean;
  description?: string;
  count?: number;
}
