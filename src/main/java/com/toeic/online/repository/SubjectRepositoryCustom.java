package com.toeic.online.repository;

import com.toeic.online.service.dto.SubjectDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepositoryCustom {

    List<SubjectDTO> exportData();
}
