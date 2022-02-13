package com.toeic.online.service;

import com.toeic.online.service.dto.ClassroomDTO;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

public interface ClassroomService {

    List<ClassroomDTO> exportData();

    ByteArrayInputStream getSampleFile() throws IOException;
}
