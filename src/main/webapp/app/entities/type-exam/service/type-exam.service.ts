import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITypeExam, getTypeExamIdentifier } from '../type-exam.model';

export type EntityResponseType = HttpResponse<ITypeExam>;
export type EntityArrayResponseType = HttpResponse<ITypeExam[]>;

@Injectable({ providedIn: 'root' })
export class TypeExamService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/type-exams');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(typeExam: ITypeExam): Observable<EntityResponseType> {
    return this.http.post<ITypeExam>(this.resourceUrl, typeExam, { observe: 'response' });
  }

  update(typeExam: ITypeExam): Observable<EntityResponseType> {
    return this.http.put<ITypeExam>(`${this.resourceUrl}/${getTypeExamIdentifier(typeExam) as number}`, typeExam, { observe: 'response' });
  }

  partialUpdate(typeExam: ITypeExam): Observable<EntityResponseType> {
    return this.http.patch<ITypeExam>(`${this.resourceUrl}/${getTypeExamIdentifier(typeExam) as number}`, typeExam, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeExam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeExam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTypeExamToCollectionIfMissing(typeExamCollection: ITypeExam[], ...typeExamsToCheck: (ITypeExam | null | undefined)[]): ITypeExam[] {
    const typeExams: ITypeExam[] = typeExamsToCheck.filter(isPresent);
    if (typeExams.length > 0) {
      const typeExamCollectionIdentifiers = typeExamCollection.map(typeExamItem => getTypeExamIdentifier(typeExamItem)!);
      const typeExamsToAdd = typeExams.filter(typeExamItem => {
        const typeExamIdentifier = getTypeExamIdentifier(typeExamItem);
        if (typeExamIdentifier == null || typeExamCollectionIdentifiers.includes(typeExamIdentifier)) {
          return false;
        }
        typeExamCollectionIdentifiers.push(typeExamIdentifier);
        return true;
      });
      return [...typeExamsToAdd, ...typeExamCollection];
    }
    return typeExamCollection;
  }
}
