import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IClassroomStudent, getClassroomStudentIdentifier } from '../classroom-student.model';

export type EntityResponseType = HttpResponse<IClassroomStudent>;
export type EntityArrayResponseType = HttpResponse<IClassroomStudent[]>;

@Injectable({ providedIn: 'root' })
export class ClassroomStudentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/classroom-students');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(classroomStudent: IClassroomStudent): Observable<EntityResponseType> {
    return this.http.post<IClassroomStudent>(this.resourceUrl, classroomStudent, { observe: 'response' });
  }

  update(classroomStudent: IClassroomStudent): Observable<EntityResponseType> {
    return this.http.put<IClassroomStudent>(
      `${this.resourceUrl}/${getClassroomStudentIdentifier(classroomStudent) as number}`,
      classroomStudent,
      { observe: 'response' }
    );
  }

  partialUpdate(classroomStudent: IClassroomStudent): Observable<EntityResponseType> {
    return this.http.patch<IClassroomStudent>(
      `${this.resourceUrl}/${getClassroomStudentIdentifier(classroomStudent) as number}`,
      classroomStudent,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClassroomStudent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClassroomStudent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addClassroomStudentToCollectionIfMissing(
    classroomStudentCollection: IClassroomStudent[],
    ...classroomStudentsToCheck: (IClassroomStudent | null | undefined)[]
  ): IClassroomStudent[] {
    const classroomStudents: IClassroomStudent[] = classroomStudentsToCheck.filter(isPresent);
    if (classroomStudents.length > 0) {
      const classroomStudentCollectionIdentifiers = classroomStudentCollection.map(
        classroomStudentItem => getClassroomStudentIdentifier(classroomStudentItem)!
      );
      const classroomStudentsToAdd = classroomStudents.filter(classroomStudentItem => {
        const classroomStudentIdentifier = getClassroomStudentIdentifier(classroomStudentItem);
        if (classroomStudentIdentifier == null || classroomStudentCollectionIdentifiers.includes(classroomStudentIdentifier)) {
          return false;
        }
        classroomStudentCollectionIdentifiers.push(classroomStudentIdentifier);
        return true;
      });
      return [...classroomStudentsToAdd, ...classroomStudentCollection];
    }
    return classroomStudentCollection;
  }
}
