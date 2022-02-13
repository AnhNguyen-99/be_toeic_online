import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITypeQuestion, getTypeQuestionIdentifier } from '../type-question.model';

export type EntityResponseType = HttpResponse<ITypeQuestion>;
export type EntityArrayResponseType = HttpResponse<ITypeQuestion[]>;

@Injectable({ providedIn: 'root' })
export class TypeQuestionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/type-questions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(typeQuestion: ITypeQuestion): Observable<EntityResponseType> {
    return this.http.post<ITypeQuestion>(this.resourceUrl, typeQuestion, { observe: 'response' });
  }

  update(typeQuestion: ITypeQuestion): Observable<EntityResponseType> {
    return this.http.put<ITypeQuestion>(`${this.resourceUrl}/${getTypeQuestionIdentifier(typeQuestion) as number}`, typeQuestion, {
      observe: 'response',
    });
  }

  partialUpdate(typeQuestion: ITypeQuestion): Observable<EntityResponseType> {
    return this.http.patch<ITypeQuestion>(`${this.resourceUrl}/${getTypeQuestionIdentifier(typeQuestion) as number}`, typeQuestion, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTypeQuestionToCollectionIfMissing(
    typeQuestionCollection: ITypeQuestion[],
    ...typeQuestionsToCheck: (ITypeQuestion | null | undefined)[]
  ): ITypeQuestion[] {
    const typeQuestions: ITypeQuestion[] = typeQuestionsToCheck.filter(isPresent);
    if (typeQuestions.length > 0) {
      const typeQuestionCollectionIdentifiers = typeQuestionCollection.map(
        typeQuestionItem => getTypeQuestionIdentifier(typeQuestionItem)!
      );
      const typeQuestionsToAdd = typeQuestions.filter(typeQuestionItem => {
        const typeQuestionIdentifier = getTypeQuestionIdentifier(typeQuestionItem);
        if (typeQuestionIdentifier == null || typeQuestionCollectionIdentifiers.includes(typeQuestionIdentifier)) {
          return false;
        }
        typeQuestionCollectionIdentifiers.push(typeQuestionIdentifier);
        return true;
      });
      return [...typeQuestionsToAdd, ...typeQuestionCollection];
    }
    return typeQuestionCollection;
  }
}
