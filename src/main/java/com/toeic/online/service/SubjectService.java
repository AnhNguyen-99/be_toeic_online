package com.toeic.online.service;


import com.toeic.online.service.dto.SubjectDTO;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

public interface SubjectService {

    List<SubjectDTO> exportData();

    ByteArrayInputStream getSampleFile() throws IOException;
}
