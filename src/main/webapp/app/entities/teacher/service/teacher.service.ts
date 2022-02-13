import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITeacher, getTeacherIdentifier } from '../teacher.model';

export type EntityResponseType = HttpResponse<ITeacher>;
export type EntityArrayResponseType = HttpResponse<ITeacher[]>;

@Injectable({ providedIn: 'root' })
export class TeacherService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/teachers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(teacher: ITeacher): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(teacher);
    return this.http
      .post<ITeacher>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(teacher: ITeacher): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(teacher);
    return this.http
      .put<ITeacher>(`${this.resourceUrl}/${getTeacherIdentifier(teacher) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(teacher: ITeacher): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(teacher);
    return this.http
      .patch<ITeacher>(`${this.resourceUrl}/${getTeacherIdentifier(teacher) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITeacher>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITeacher[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTeacherToCollectionIfMissing(teacherCollection: ITeacher[], ...teachersToCheck: (ITeacher | null | undefined)[]): ITeacher[] {
    const teachers: ITeacher[] = teachersToCheck.filter(isPresent);
    if (teachers.length > 0) {
      const teacherCollectionIdentifiers = teacherCollection.map(teacherItem => getTeacherIdentifier(teacherItem)!);
      const teachersToAdd = teachers.filter(teacherItem => {
        const teacherIdentifier = getTeacherIdentifier(teacherItem);
        if (teacherIdentifier == null || teacherCollectionIdentifiers.includes(teacherIdentifier)) {
          return false;
        }
        teacherCollectionIdentifiers.push(teacherIdentifier);
        return true;
      });
      return [...teachersToAdd, ...teacherCollection];
    }
    return teacherCollection;
  }

  protected convertDateFromClient(teacher: ITeacher): ITeacher {
    return Object.assign({}, teacher, {
      createDate: teacher.createDate?.isValid() ? teacher.createDate.toJSON() : undefined,
      updateDate: teacher.updateDate?.isValid() ? teacher.updateDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createDate = res.body.createDate ? dayjs(res.body.createDate) : undefined;
      res.body.updateDate = res.body.updateDate ? dayjs(res.body.updateDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((teacher: ITeacher) => {
        teacher.createDate = teacher.createDate ? dayjs(teacher.createDate) : undefined;
        teacher.updateDate = teacher.updateDate ? dayjs(teacher.updateDate) : undefined;
      });
    }
    return res;
  }
}
