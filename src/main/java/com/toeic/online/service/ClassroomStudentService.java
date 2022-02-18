package com.toeic.online.service;

import com.toeic.online.domain.ClassroomStudent;
import com.toeic.online.service.dto.ClassroomStudentDTO;

import java.util.List;
import java.util.Map;

public interface ClassroomStudentService {

    Map<String, Object> search(String classCode, String studentCode, Integer page, Integer pageSize);

    List<ClassroomStudentDTO> exportData(String classCode, String studentCode);
}
