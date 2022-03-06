package com.toeic.online.service.impl;

import com.toeic.online.repository.impl.ExamRepositoryCustomImpl;
import com.toeic.online.service.ExamService;
import com.toeic.online.service.dto.ClassroomSearchDTO;
import com.toeic.online.service.dto.ExamDTO;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class ExamServiceImpl implements ExamService {

    private final ExamRepositoryCustomImpl examRepositoryCustom;

    public ExamServiceImpl(ExamRepositoryCustomImpl examRepositoryCustom) {
        this.examRepositoryCustom = examRepositoryCustom;
    }

    @Override
    public Map<String, Object> search(ClassroomSearchDTO subjectCode, Integer page, Integer pageSize) {
        List<ExamDTO> lstExam = examRepositoryCustom.search(subjectCode, page, pageSize);
        Integer total = examRepositoryCustom.export(subjectCode).size();
        Map<String, Object> res = new HashMap<>();
        res.put("lstExam", lstExam);
        res.put("totalRecord", total);
        return res;
    }

    @Override
    public List<ExamDTO> export(ClassroomSearchDTO subjectCode) {
        return examRepositoryCustom.export(subjectCode);
    }
}
