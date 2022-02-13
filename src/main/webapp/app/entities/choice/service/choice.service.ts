import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChoice, getChoiceIdentifier } from '../choice.model';

export type EntityResponseType = HttpResponse<IChoice>;
export type EntityArrayResponseType = HttpResponse<IChoice[]>;

@Injectable({ providedIn: 'root' })
export class ChoiceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/choices');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(choice: IChoice): Observable<EntityResponseType> {
    return this.http.post<IChoice>(this.resourceUrl, choice, { observe: 'response' });
  }

  update(choice: IChoice): Observable<EntityResponseType> {
    return this.http.put<IChoice>(`${this.resourceUrl}/${getChoiceIdentifier(choice) as number}`, choice, { observe: 'response' });
  }

  partialUpdate(choice: IChoice): Observable<EntityResponseType> {
    return this.http.patch<IChoice>(`${this.resourceUrl}/${getChoiceIdentifier(choice) as number}`, choice, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChoice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChoice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addChoiceToCollectionIfMissing(choiceCollection: IChoice[], ...choicesToCheck: (IChoice | null | undefined)[]): IChoice[] {
    const choices: IChoice[] = choicesToCheck.filter(isPresent);
    if (choices.length > 0) {
      const choiceCollectionIdentifiers = choiceCollection.map(choiceItem => getChoiceIdentifier(choiceItem)!);
      const choicesToAdd = choices.filter(choiceItem => {
        const choiceIdentifier = getChoiceIdentifier(choiceItem);
        if (choiceIdentifier == null || choiceCollectionIdentifiers.includes(choiceIdentifier)) {
          return false;
        }
        choiceCollectionIdentifiers.push(choiceIdentifier);
        return true;
      });
      return [...choicesToAdd, ...choiceCollection];
    }
    return choiceCollection;
  }
}
