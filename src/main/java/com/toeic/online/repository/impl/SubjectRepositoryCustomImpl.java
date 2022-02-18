package com.toeic.online.repository.impl;

import com.toeic.online.repository.SubjectRepositoryCustom;
import com.toeic.online.service.dto.ClassroomDTO;
import com.toeic.online.service.dto.SubjectDTO;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.InstantType;
import org.hibernate.type.StringType;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.List;

@Component
public class SubjectRepositoryCustomImpl implements SubjectRepositoryCustom {

    private EntityManager entityManager;

    public SubjectRepositoryCustomImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public List<SubjectDTO> exportData() {
        StringBuilder sql = new StringBuilder("SELECT" +
            " s.code," +
            " s.name," +
            " c.name as className," +
            " s.status," +
            " case when s.status = 0 then 'Đang khóa' else 'Đang hoạt động' end as statusStr, " +
            " s.create_date as createDate, s.create_name as createName " +
            "FROM subject s join classroom c " +
            "ON s.class_code = c.code ");
        NativeQuery<SubjectDTO> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
        query.addScalar("code", new StringType())
            .addScalar("name", new StringType())
            .addScalar("className", new StringType())
            .addScalar("statusStr", new StringType())
            .addScalar("createDate", new InstantType())
            .addScalar("createName", new StringType()).setResultTransformer(Transformers.aliasToBean(SubjectDTO.class));
        return query.list();
    }
}
