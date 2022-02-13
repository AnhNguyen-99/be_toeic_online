export interface ITypeQuestion {
  id?: number;
  code?: string | null;
  name?: string | null;
}

export class TypeQuestion implements ITypeQuestion {
  constructor(public id?: number, public code?: string | null, public name?: string | null) {}
}

export function getTypeQuestionIdentifier(typeQuestion: ITypeQuestion): number | undefined {
  return typeQuestion.id;
}
