import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IExamUser, getExamUserIdentifier } from '../exam-user.model';

export type EntityResponseType = HttpResponse<IExamUser>;
export type EntityArrayResponseType = HttpResponse<IExamUser[]>;

@Injectable({ providedIn: 'root' })
export class ExamUserService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/exam-users');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(examUser: IExamUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(examUser);
    return this.http
      .post<IExamUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(examUser: IExamUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(examUser);
    return this.http
      .put<IExamUser>(`${this.resourceUrl}/${getExamUserIdentifier(examUser) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(examUser: IExamUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(examUser);
    return this.http
      .patch<IExamUser>(`${this.resourceUrl}/${getExamUserIdentifier(examUser) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExamUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExamUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addExamUserToCollectionIfMissing(examUserCollection: IExamUser[], ...examUsersToCheck: (IExamUser | null | undefined)[]): IExamUser[] {
    const examUsers: IExamUser[] = examUsersToCheck.filter(isPresent);
    if (examUsers.length > 0) {
      const examUserCollectionIdentifiers = examUserCollection.map(examUserItem => getExamUserIdentifier(examUserItem)!);
      const examUsersToAdd = examUsers.filter(examUserItem => {
        const examUserIdentifier = getExamUserIdentifier(examUserItem);
        if (examUserIdentifier == null || examUserCollectionIdentifiers.includes(examUserIdentifier)) {
          return false;
        }
        examUserCollectionIdentifiers.push(examUserIdentifier);
        return true;
      });
      return [...examUsersToAdd, ...examUserCollection];
    }
    return examUserCollection;
  }

  protected convertDateFromClient(examUser: IExamUser): IExamUser {
    return Object.assign({}, examUser, {
      timeStart: examUser.timeStart?.isValid() ? examUser.timeStart.toJSON() : undefined,
      timeFinish: examUser.timeFinish?.isValid() ? examUser.timeFinish.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timeStart = res.body.timeStart ? dayjs(res.body.timeStart) : undefined;
      res.body.timeFinish = res.body.timeFinish ? dayjs(res.body.timeFinish) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((examUser: IExamUser) => {
        examUser.timeStart = examUser.timeStart ? dayjs(examUser.timeStart) : undefined;
        examUser.timeFinish = examUser.timeFinish ? dayjs(examUser.timeFinish) : undefined;
      });
    }
    return res;
  }
}
