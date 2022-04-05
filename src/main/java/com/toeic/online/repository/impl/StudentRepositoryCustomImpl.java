package com.toeic.online.repository.impl;

import com.toeic.online.repository.StudentRepositoryCustom;
import com.toeic.online.service.dto.SearchTeacherDTO;
import com.toeic.online.service.dto.StudentDTO;
import com.toeic.online.service.dto.TeacherDTO;
import java.util.List;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.*;
import org.springframework.stereotype.Component;

@Component
public class StudentRepositoryCustomImpl implements StudentRepositoryCustom {

    private EntityManager entityManager;

    public StudentRepositoryCustomImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<StudentDTO> search(SearchTeacherDTO searchTeacherDTO, Integer page, Integer pageSize) {
        StringBuilder sql = new StringBuilder(
            "SELECT" +
            " t.id, " +
            " t.code," +
            " t.full_name as fullName, " +
            " t.email, " +
            " t.phone, " +
            " t.status, " +
            " case when t.status = 0 then 'Đang khóa' else 'Đang hoạt động' end as statusStr, " +
            " t.create_date as createDate," +
            " t.create_name as createName " +
            " FROM student t" +
            " WHERE 1 = 1 "
        );
        if (!searchTeacherDTO.getName().isEmpty()) {
            sql.append(
                " AND (UPPER(t.code) like CONCAT('%', UPPER(:name), '%') or UPPER(t.full_name) like CONCAT('%', UPPER(:name), '%')) "
            );
        }
        if (null != searchTeacherDTO.getStatus()) {
            sql.append(" AND t.status = :status");
        }
        if (page != null && pageSize != null) {
            Integer offset;
            if (page <= 1) {
                offset = 0;
            } else {
                offset = (page - 1) * pageSize;
            }
            sql.append("  LIMIT " + offset + " , " + pageSize + " ");
        }
        NativeQuery<StudentDTO> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
        query
            .addScalar("code", new StringType())
            .addScalar("id", new LongType())
            .addScalar("fullName", new StringType())
            .addScalar("email", new StringType())
            .addScalar("phone", new StringType())
            .addScalar("status", new BooleanType())
            .addScalar("statusStr", new StringType())
            .addScalar("createDate", new InstantType())
            .addScalar("createName", new StringType())
            .setResultTransformer(Transformers.aliasToBean(StudentDTO.class));
        if (!searchTeacherDTO.getName().isEmpty()) {
            query.setParameter("name", searchTeacherDTO.getName());
        }
        if (null != searchTeacherDTO.getStatus()) {
            query.setParameter("status", searchTeacherDTO.getStatus());
        }
        return query.list();
    }

    @Override
    public List<StudentDTO> exportData(SearchTeacherDTO searchTeacherDTO) {
        StringBuilder sql = new StringBuilder(
            "SELECT" +
            " t.code," +
            " t.full_name as fullName, " +
            " t.email, " +
            " t.phone, " +
            " t.status, " +
            " case when t.status = 0 then 'Đang khóa' else 'Đang hoạt động' end as statusStr, " +
            " t.create_date as createDate," +
            " t.create_name as createName " +
            " FROM student t" +
            " WHERE 1 = 1 "
        );
        if (!searchTeacherDTO.getName().isEmpty()) {
            sql.append(
                " AND (UPPER(t.code) like CONCAT('%', UPPER(:name), '%') or UPPER(t.full_name) like CONCAT('%', UPPER(:name), '%')) "
            );
        }
        if (null != searchTeacherDTO.getStatus()) {
            sql.append(" AND t.status = :status");
        }
        NativeQuery<StudentDTO> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
        query
            .addScalar("code", new StringType())
            .addScalar("fullName", new StringType())
            .addScalar("email", new StringType())
            .addScalar("phone", new StringType())
            .addScalar("status", new BooleanType())
            .addScalar("statusStr", new StringType())
            .addScalar("createDate", new InstantType())
            .addScalar("createName", new StringType())
            .setResultTransformer(Transformers.aliasToBean(StudentDTO.class));
        if (!searchTeacherDTO.getName().isEmpty()) {
            query.setParameter("name", searchTeacherDTO.getName());
        }
        if (null != searchTeacherDTO.getStatus()) {
            query.setParameter("status", searchTeacherDTO.getStatus());
        }
        return query.list();
    }

    @Override
    public List<StudentDTO> getPointExamStudent(Long examId) {
        StringBuilder sql = new StringBuilder(
            "\n select distinct su.id as id,\n" +
            " su.code as code,\n" +
            " su.full_name as fullName,\n" +
            " su.email as email,\n" +
            " su.phone as phone,\n" +
            " su.status as status,\n" +
            " su.create_date as createDate,\n" +
            " su.create_name as createName,\n" +
            " su.update_date as updateDate,\n" +
            " su.update_name as updateName,\n" +
            " eu.total_point as point" +
            " from exam ex join subject s on ex.subject_code = s.code\n" +
            " join classroom c on s.class_code = c.code\n" +
            " join teacher t on t.code = c.teacher_code\n" +
            " join classroom_student cs on c.code = cs.class_code\n" +
            " join student su on cs.student_code = su.code\n" +
            " join exam_user eu on eu.exam_id = ex.id\n" +
            " where 1 = 1 "
        );
        if (examId != null) {
            sql.append(" and ex.id = :examId");
        }
        NativeQuery<StudentDTO> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
        query
            .addScalar("code", new StringType())
            .addScalar("id", new LongType())
            .addScalar("fullName", new StringType())
            .addScalar("email", new StringType())
            .addScalar("phone", new StringType())
            .addScalar("status", new BooleanType())
            .addScalar("createDate", new InstantType())
            .addScalar("createName", new StringType())
            .addScalar("point", new FloatType())
            .setResultTransformer(Transformers.aliasToBean(StudentDTO.class));
        if (examId != null) {
            query.setParameter("examId", examId);
        }
        return query.list();
    }
}
