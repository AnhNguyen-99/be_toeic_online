package com.toeic.online.repository.impl;

import com.toeic.online.repository.ClassroomRepositoryCustom;
import com.toeic.online.service.dto.ClassroomDTO;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.InstantType;
import org.hibernate.type.StringType;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.List;

@Component
public class ClassroomRepositoryCustomImpl implements ClassroomRepositoryCustom {

    private EntityManager entityManager;
    public ClassroomRepositoryCustomImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public List<ClassroomDTO> exportData() {
        StringBuilder sql = new StringBuilder("SELECT" +
            " c.code," +
            " c.name," +
            " t.full_name as teacherName," +
            " c.status," +
            " case when c.status = 0 then 'Đang khóa' else 'Đang hoạt động' end as statusStr, " +
            " c.create_date as createDate, c.create_name as createName " +
            "FROM classroom c join teacher t " +
            "ON c.teacher_code = t.code ");
        NativeQuery<ClassroomDTO> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
        query.addScalar("code", new StringType())
            .addScalar("name", new StringType())
            .addScalar("teacherName", new StringType())
            .addScalar("statusStr", new StringType())
            .addScalar("createDate", new InstantType())
            .addScalar("createName", new StringType()).setResultTransformer(Transformers.aliasToBean(ClassroomDTO.class));
        return query.list();
    }
}
