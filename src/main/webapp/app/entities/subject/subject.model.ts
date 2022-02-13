import * as dayjs from 'dayjs';

export interface ISubject {
  id?: number;
  code?: string | null;
  name?: string | null;
  classCode?: string | null;
  status?: boolean | null;
  createDate?: dayjs.Dayjs | null;
  createName?: string | null;
  updateDate?: dayjs.Dayjs | null;
  updateName?: string | null;
}

export class Subject implements ISubject {
  constructor(
    public id?: number,
    public code?: string | null,
    public name?: string | null,
    public classCode?: string | null,
    public status?: boolean | null,
    public createDate?: dayjs.Dayjs | null,
    public createName?: string | null,
    public updateDate?: dayjs.Dayjs | null,
    public updateName?: string | null
  ) {
    this.status = this.status ?? false;
  }
}

export function getSubjectIdentifier(subject: ISubject): number | undefined {
  return subject.id;
}
