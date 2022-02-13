import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHistoryContact, getHistoryContactIdentifier } from '../history-contact.model';

export type EntityResponseType = HttpResponse<IHistoryContact>;
export type EntityArrayResponseType = HttpResponse<IHistoryContact[]>;

@Injectable({ providedIn: 'root' })
export class HistoryContactService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/history-contacts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(historyContact: IHistoryContact): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historyContact);
    return this.http
      .post<IHistoryContact>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historyContact: IHistoryContact): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historyContact);
    return this.http
      .put<IHistoryContact>(`${this.resourceUrl}/${getHistoryContactIdentifier(historyContact) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(historyContact: IHistoryContact): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historyContact);
    return this.http
      .patch<IHistoryContact>(`${this.resourceUrl}/${getHistoryContactIdentifier(historyContact) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistoryContact>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistoryContact[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHistoryContactToCollectionIfMissing(
    historyContactCollection: IHistoryContact[],
    ...historyContactsToCheck: (IHistoryContact | null | undefined)[]
  ): IHistoryContact[] {
    const historyContacts: IHistoryContact[] = historyContactsToCheck.filter(isPresent);
    if (historyContacts.length > 0) {
      const historyContactCollectionIdentifiers = historyContactCollection.map(
        historyContactItem => getHistoryContactIdentifier(historyContactItem)!
      );
      const historyContactsToAdd = historyContacts.filter(historyContactItem => {
        const historyContactIdentifier = getHistoryContactIdentifier(historyContactItem);
        if (historyContactIdentifier == null || historyContactCollectionIdentifiers.includes(historyContactIdentifier)) {
          return false;
        }
        historyContactCollectionIdentifiers.push(historyContactIdentifier);
        return true;
      });
      return [...historyContactsToAdd, ...historyContactCollection];
    }
    return historyContactCollection;
  }

  protected convertDateFromClient(historyContact: IHistoryContact): IHistoryContact {
    return Object.assign({}, historyContact, {
      sendDate: historyContact.sendDate?.isValid() ? historyContact.sendDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sendDate = res.body.sendDate ? dayjs(res.body.sendDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((historyContact: IHistoryContact) => {
        historyContact.sendDate = historyContact.sendDate ? dayjs(historyContact.sendDate) : undefined;
      });
    }
    return res;
  }
}
