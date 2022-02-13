import * as dayjs from 'dayjs';

export interface IQuestion {
  id?: number;
  questionType?: string | null;
  questionText?: string | null;
  subjectCode?: string | null;
  level?: number | null;
  point?: number | null;
  status?: boolean | null;
  createDate?: dayjs.Dayjs | null;
  createName?: string | null;
  updateDate?: dayjs.Dayjs | null;
  updateName?: string | null;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public questionType?: string | null,
    public questionText?: string | null,
    public subjectCode?: string | null,
    public level?: number | null,
    public point?: number | null,
    public status?: boolean | null,
    public createDate?: dayjs.Dayjs | null,
    public createName?: string | null,
    public updateDate?: dayjs.Dayjs | null,
    public updateName?: string | null
  ) {
    this.status = this.status ?? false;
  }
}

export function getQuestionIdentifier(question: IQuestion): number | undefined {
  return question.id;
}
