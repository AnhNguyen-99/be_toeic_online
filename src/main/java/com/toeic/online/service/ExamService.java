package com.toeic.online.service;

import com.toeic.online.service.dto.ClassroomSearchDTO;
import com.toeic.online.service.dto.ExamDTO;
import java.util.List;
import java.util.Map;

public interface ExamService {
    Map<String, Object> search(ClassroomSearchDTO subjectCode, Integer page, Integer pageSize);

    List<ExamDTO> export(ClassroomSearchDTO subjectCode);
}
