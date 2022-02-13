import * as dayjs from 'dayjs';

export interface IExam {
  id?: number;
  beginExam?: dayjs.Dayjs | null;
  durationExam?: number | null;
  finishExam?: dayjs.Dayjs | null;
  questionData?: string | null;
  subjectCode?: string | null;
  title?: string | null;
  status?: boolean | null;
  createDate?: dayjs.Dayjs | null;
  createName?: string | null;
  updateDate?: dayjs.Dayjs | null;
  updateName?: string | null;
}

export class Exam implements IExam {
  constructor(
    public id?: number,
    public beginExam?: dayjs.Dayjs | null,
    public durationExam?: number | null,
    public finishExam?: dayjs.Dayjs | null,
    public questionData?: string | null,
    public subjectCode?: string | null,
    public title?: string | null,
    public status?: boolean | null,
    public createDate?: dayjs.Dayjs | null,
    public createName?: string | null,
    public updateDate?: dayjs.Dayjs | null,
    public updateName?: string | null
  ) {
    this.status = this.status ?? false;
  }
}

export function getExamIdentifier(exam: IExam): number | undefined {
  return exam.id;
}
