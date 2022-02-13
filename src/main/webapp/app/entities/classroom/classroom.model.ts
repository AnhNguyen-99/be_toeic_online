import * as dayjs from 'dayjs';

export interface IClassroom {
  id?: number;
  code?: string | null;
  name?: string | null;
  teacherCode?: string | null;
  status?: boolean | null;
  avatar?: string | null;
  createDate?: dayjs.Dayjs | null;
  createName?: string | null;
  updateDate?: dayjs.Dayjs | null;
  updateName?: string | null;
}

export class Classroom implements IClassroom {
  constructor(
    public id?: number,
    public code?: string | null,
    public name?: string | null,
    public teacherCode?: string | null,
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

export function getClassroomIdentifier(classroom: IClassroom): number | undefined {
  return classroom.id;
}
