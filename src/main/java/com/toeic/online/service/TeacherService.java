package com.toeic.online.service;

import com.toeic.online.service.dto.SearchTeacherDTO;
import com.toeic.online.service.dto.TeacherDTO;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface TeacherService {

    Map<String, Object> search(SearchTeacherDTO searchTeacherDTO, Integer page, Integer pageSize);

    List<TeacherDTO> exportData(SearchTeacherDTO searchTeacherDTO);

    ByteArrayInputStream getSampleFile() throws IOException;
}
