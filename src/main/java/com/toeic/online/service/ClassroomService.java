package com.toeic.online.service;

import com.toeic.online.service.dto.ClassroomDTO;
import com.toeic.online.service.dto.ClassroomSearchDTO;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

public interface ClassroomService {
    List<ClassroomDTO> exportData(ClassroomSearchDTO classroomSearchDTO);

    ByteArrayInputStream getSampleFile() throws IOException;

    Map<String, Object> search(ClassroomSearchDTO classroomSearchDTO, Integer page, Integer pageSize);
}
