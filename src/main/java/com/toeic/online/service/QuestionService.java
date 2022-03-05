package com.toeic.online.service;

import com.toeic.online.service.dto.QuestionDTO;
import com.toeic.online.service.dto.SearchQuestionDTO;
import java.util.List;
import java.util.Map;

public interface QuestionService {
    Map<String, Object> search(SearchQuestionDTO searchQuestionDTO, Integer page, Integer pageSize);

    List<QuestionDTO> export(SearchQuestionDTO searchQuestionDTO);

    QuestionDTO findById(Long id);
}
