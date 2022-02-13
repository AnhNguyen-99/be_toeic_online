import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHistoryContactDetails, getHistoryContactDetailsIdentifier } from '../history-contact-details.model';

export type EntityResponseType = HttpResponse<IHistoryContactDetails>;
export type EntityArrayResponseType = HttpResponse<IHistoryContactDetails[]>;

@Injectable({ providedIn: 'root' })
export class HistoryContactDetailsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/history-contact-details');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(historyContactDetails: IHistoryContactDetails): Observable<EntityResponseType> {
    return this.http.post<IHistoryContactDetails>(this.resourceUrl, historyContactDetails, { observe: 'response' });
  }

  update(historyContactDetails: IHistoryContactDetails): Observable<EntityResponseType> {
    return this.http.put<IHistoryContactDetails>(
      `${this.resourceUrl}/${getHistoryContactDetailsIdentifier(historyContactDetails) as number}`,
      historyContactDetails,
      { observe: 'response' }
    );
  }

  partialUpdate(historyContactDetails: IHistoryContactDetails): Observable<EntityResponseType> {
    return this.http.patch<IHistoryContactDetails>(
      `${this.resourceUrl}/${getHistoryContactDetailsIdentifier(historyContactDetails) as number}`,
      historyContactDetails,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHistoryContactDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHistoryContactDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHistoryContactDetailsToCollectionIfMissing(
    historyContactDetailsCollection: IHistoryContactDetails[],
    ...historyContactDetailsToCheck: (IHistoryContactDetails | null | undefined)[]
  ): IHistoryContactDetails[] {
    const historyContactDetails: IHistoryContactDetails[] = historyContactDetailsToCheck.filter(isPresent);
    if (historyContactDetails.length > 0) {
      const historyContactDetailsCollectionIdentifiers = historyContactDetailsCollection.map(
        historyContactDetailsItem => getHistoryContactDetailsIdentifier(historyContactDetailsItem)!
      );
      const historyContactDetailsToAdd = historyContactDetails.filter(historyContactDetailsItem => {
        const historyContactDetailsIdentifier = getHistoryContactDetailsIdentifier(historyContactDetailsItem);
        if (
          historyContactDetailsIdentifier == null ||
          historyContactDetailsCollectionIdentifiers.includes(historyContactDetailsIdentifier)
        ) {
          return false;
        }
        historyContactDetailsCollectionIdentifiers.push(historyContactDetailsIdentifier);
        return true;
      });
      return [...historyContactDetailsToAdd, ...historyContactDetailsCollection];
    }
    return historyContactDetailsCollection;
  }
}
