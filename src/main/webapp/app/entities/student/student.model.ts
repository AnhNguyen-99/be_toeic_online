import * as dayjs from 'dayjs';

export interface IStudent {
  id?: number;
  code?: string | null;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: boolean | null;
  avatar?: string | null;
  createDate?: dayjs.Dayjs | null;
  createName?: string | null;
  updateDate?: dayjs.Dayjs | null;
  updateName?: string | null;
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public code?: string | null,
    public fullName?: string | null,
    public email?: string | null,
    public phone?: string | null,
    public status?: boolean | null,
    public avatar?: string | null,
    public createDate?: dayjs.Dayjs | null,
    public createName?: string | null,
    public updateDate?: dayjs.Dayjs | null,
    public updateName?: string | null
  ) {
    this.status = this.status ?? false;
  }
}

export function getStudentIdentifier(student: IStudent): number | undefined {
  return student.id;
}
