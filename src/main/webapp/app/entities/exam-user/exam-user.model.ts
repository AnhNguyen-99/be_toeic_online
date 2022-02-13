import * as dayjs from 'dayjs';

export interface IExamUser {
  id?: number;
  studentCode?: string | null;
  examId?: number | null;
  totalPoint?: number | null;
  answerSheet?: string | null;
  timeStart?: dayjs.Dayjs | null;
  timeFinish?: dayjs.Dayjs | null;
  timeRemaining?: number | null;
}

export class ExamUser implements IExamUser {
  constructor(
    public id?: number,
    public studentCode?: string | null,
    public examId?: number | null,
    public totalPoint?: number | null,
    public answerSheet?: string | null,
    public timeStart?: dayjs.Dayjs | null,
    public timeFinish?: dayjs.Dayjs | null,
    public timeRemaining?: number | null
  ) {}
}

export function getExamUserIdentifier(examUser: IExamUser): number | undefined {
  return examUser.id;
}
