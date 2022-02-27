package com.toeic.online.service;

import com.toeic.online.service.dto.SearchTeacherDTO;
import com.toeic.online.service.dto.StudentDTO;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface StudentService {
    Map<String, Object> search(SearchTeacherDTO searchTeacherDTO, Integer page, Integer pageSize);

    List<StudentDTO> exportData(SearchTeacherDTO searchTeacherDTO);

    ByteArrayInputStream getSampleFile() throws IOException;
}
