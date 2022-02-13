export interface IHistoryContactDetails {
  id?: number;
  historyContact?: string | null;
  isOpen?: boolean | null;
  status?: boolean | null;
}

export class HistoryContactDetails implements IHistoryContactDetails {
  constructor(public id?: number, public historyContact?: string | null, public isOpen?: boolean | null, public status?: boolean | null) {
    this.isOpen = this.isOpen ?? false;
    this.status = this.status ?? false;
  }
}

export function getHistoryContactDetailsIdentifier(historyContactDetails: IHistoryContactDetails): number | undefined {
  return historyContactDetails.id;
}
