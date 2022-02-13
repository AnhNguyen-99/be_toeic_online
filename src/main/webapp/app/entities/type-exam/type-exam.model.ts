export interface ITypeExam {
  id?: number;
  code?: string | null;
  name?: string | null;
}

export class TypeExam implements ITypeExam {
  constructor(public id?: number, public code?: string | null, public name?: string | null) {}
}

export function getTypeExamIdentifier(typeExam: ITypeExam): number | undefined {
  return typeExam.id;
}
