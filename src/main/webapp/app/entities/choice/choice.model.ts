export interface IChoice {
  id?: number;
  questionId?: number | null;
  choiceText?: string | null;
  corrected?: string | null;
}

export class Choice implements IChoice {
  constructor(public id?: number, public questionId?: number | null, public choiceText?: string | null, public corrected?: string | null) {}
}

export function getChoiceIdentifier(choice: IChoice): number | undefined {
  return choice.id;
}
