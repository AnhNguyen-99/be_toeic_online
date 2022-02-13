export interface IClassroomStudent {
  id?: number;
  classCode?: string | null;
  studentCode?: string | null;
}

export class ClassroomStudent implements IClassroomStudent {
  constructor(public id?: number, public classCode?: string | null, public studentCode?: string | null) {}
}

export function getClassroomStudentIdentifier(classroomStudent: IClassroomStudent): number | undefined {
  return classroomStudent.id;
}
