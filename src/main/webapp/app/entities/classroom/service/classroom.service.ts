import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IClassroom, getClassroomIdentifier } from '../classroom.model';

export type EntityResponseType = HttpResponse<IClassroom>;
export type EntityArrayResponseType = HttpResponse<IClassroom[]>;

@Injectable({ providedIn: 'root' })
export class ClassroomService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/classrooms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(classroom: IClassroom): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(classroom);
    return this.http
      .post<IClassroom>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(classroom: IClassroom): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(classroom);
    return this.http
      .put<IClassroom>(`${this.resourceUrl}/${getClassroomIdentifier(classroom) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(classroom: IClassroom): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(classroom);
    return this.http
      .patch<IClassroom>(`${this.resourceUrl}/${getClassroomIdentifier(classroom) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IClassroom>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClassroom[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addClassroomToCollectionIfMissing(
    classroomCollection: IClassroom[],
    ...classroomsToCheck: (IClassroom | null | undefined)[]
  ): IClassroom[] {
    const classrooms: IClassroom[] = classroomsToCheck.filter(isPresent);
    if (classrooms.length > 0) {
      const classroomCollectionIdentifiers = classroomCollection.map(classroomItem => getClassroomIdentifier(classroomItem)!);
      const classroomsToAdd = classrooms.filter(classroomItem => {
        const classroomIdentifier = getClassroomIdentifier(classroomItem);
        if (classroomIdentifier == null || classroomCollectionIdentifiers.includes(classroomIdentifier)) {
          return false;
        }
        classroomCollectionIdentifiers.push(classroomIdentifier);
        return true;
      });
      return [...classroomsToAdd, ...classroomCollection];
    }
    return classroomCollection;
  }

  protected convertDateFromClient(classroom: IClassroom): IClassroom {
    return Object.assign({}, classroom, {
      createDate: classroom.createDate?.isValid() ? classroom.createDate.toJSON() : undefined,
      updateDate: classroom.updateDate?.isValid() ? classroom.updateDate.toJSON() : undefined,
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
      res.body.forEach((classroom: IClassroom) => {
        classroom.createDate = classroom.createDate ? dayjs(classroom.createDate) : undefined;
        classroom.updateDate = classroom.updateDate ? dayjs(classroom.updateDate) : undefined;
      });
    }
    return res;
  }
}
