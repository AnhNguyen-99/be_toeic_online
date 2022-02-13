package com.toeic.online.repository;

import com.toeic.online.service.dto.ClassroomDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepositoryCustom {

    List<ClassroomDTO> exportData();
}
