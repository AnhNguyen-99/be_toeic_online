package com.toeic.online.service;

import com.toeic.online.service.dto.SearchSubjectDTO;
import com.toeic.online.service.dto.SubjectDTO;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface SubjectService {
    List<SubjectDTO> exportData(SearchSubjectDTO searchSubjectDTO);

    ByteArrayInputStream getSampleFile() throws IOException;

    Map<String, Object> search(SearchSubjectDTO searchSubjectDTO, Integer page, Integer pageSize);
}
