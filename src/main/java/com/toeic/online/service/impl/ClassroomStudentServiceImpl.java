package com.toeic.online.service.impl;

import com.toeic.online.repository.ClassroomStudentRepositoryCustom;
import com.toeic.online.service.ClassroomStudentService;
import com.toeic.online.service.dto.ClassroomStudentDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ClassroomStudentServiceImpl implements ClassroomStudentService {

    private final ClassroomStudentRepositoryCustom classroomStudentRepositoryCustom;

    public ClassroomStudentServiceImpl(ClassroomStudentRepositoryCustom classroomStudentRepositoryCustom) {
        this.classroomStudentRepositoryCustom = classroomStudentRepositoryCustom;
    }

    @Override
    public Map<String, Object> search(String classCode, String studentCode, Integer page, Integer pageSize) {
        List<ClassroomStudentDTO> lstClassroomStudent = classroomStudentRepositoryCustom.search(classCode, studentCode, page, pageSize);
        Integer total = classroomStudentRepositoryCustom.exportData(classCode, studentCode).size();
        Map<String, Object> res = new HashMap<>();
        res.put("lstClassroomStudent", lstClassroomStudent);
        res.put("totalRecord", total);
        return res;
    }

    @Override
    public List<ClassroomStudentDTO> exportData(String classCode, String studentCode) {
        return classroomStudentRepositoryCustom.exportData(classCode, studentCode);
    }
}
