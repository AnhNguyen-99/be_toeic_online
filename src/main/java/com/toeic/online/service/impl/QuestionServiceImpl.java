package com.toeic.online.service.impl;

import com.toeic.online.domain.Choice;
import com.toeic.online.repository.ChoiceRepository;
import com.toeic.online.repository.impl.QuestionRepositoryCustomImpl;
import com.toeic.online.service.QuestionService;
import com.toeic.online.service.dto.QuestionDTO;
import com.toeic.online.service.dto.SearchQuestionDTO;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepositoryCustomImpl questionRepositoryCustomImpl;

    private final ChoiceRepository choiceRepository;

    public QuestionServiceImpl(QuestionRepositoryCustomImpl questionRepositoryCustomImpl, ChoiceRepository choiceRepository) {
        this.questionRepositoryCustomImpl = questionRepositoryCustomImpl;
        this.choiceRepository = choiceRepository;
    }

    @Override
    public Map<String, Object> search(SearchQuestionDTO searchQuestionDTO, Integer page, Integer pageSize) {
        List<QuestionDTO> lstQuestion = questionRepositoryCustomImpl.search(searchQuestionDTO, page, pageSize);
        Integer total = questionRepositoryCustomImpl.export(searchQuestionDTO).size();
        Map<String, Object> res = new HashMap<>();
        res.put("lstQuestion", lstQuestion);
        res.put("totalRecord", total);
        return res;
    }

    @Override
    public List<QuestionDTO> export(SearchQuestionDTO searchQuestionDTO) {
        return questionRepositoryCustomImpl.export(searchQuestionDTO);
    }

    @Override
    public QuestionDTO findById(Long id) {
        QuestionDTO questionDTO = questionRepositoryCustomImpl.findByQuestionId(id);
        // Đáp án câu hỏi
        List<Choice> lstChoice = choiceRepository.getListChoiceByQuestionId(questionDTO.getId());
        questionDTO.setLstChoice(lstChoice);
        return questionDTO;
    }
}
