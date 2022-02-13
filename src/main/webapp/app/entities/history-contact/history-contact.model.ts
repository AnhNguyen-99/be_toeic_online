import * as dayjs from 'dayjs';

export interface IHistoryContact {
  id?: number;
  code?: string | null;
  title?: string | null;
  content?: string | null;
  sender?: string | null;
  toer?: string | null;
  sendDate?: dayjs.Dayjs | null;
}

export class HistoryContact implements IHistoryContact {
  constructor(
    public id?: number,
    public code?: string | null,
    public title?: string | null,
    public content?: string | null,
    public sender?: string | null,
    public toer?: string | null,
    public sendDate?: dayjs.Dayjs | null
  ) {}
}

export function getHistoryContactIdentifier(historyContact: IHistoryContact): number | undefined {
  return historyContact.id;
}
