package com.toeic.online.service.impl;

import com.toeic.online.domain.Exam;
import com.toeic.online.repository.ExamRepository;
import com.toeic.online.repository.QuestionRepositoryCustom;
import com.toeic.online.repository.StudentRepositoryCustom;
import com.toeic.online.repository.impl.ExamRepositoryCustomImpl;
import com.toeic.online.service.ExamService;
import com.toeic.online.service.QuestionService;
import com.toeic.online.service.dto.ClassroomSearchDTO;
import com.toeic.online.service.dto.ExamDTO;
import com.toeic.online.service.dto.QuestionDTO;
import com.toeic.online.service.dto.StudentDTO;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import org.springframework.stereotype.Service;

@Service
public class ExamServiceImpl implements ExamService {

    private final ExamRepositoryCustomImpl examRepositoryCustom;

    private final ExamRepository examRepository;

    private final QuestionRepositoryCustom questionRepositoryCustom;

    private final QuestionService questionService;

    private final StudentRepositoryCustom studentRepositoryCustom;

    public ExamServiceImpl(
        ExamRepositoryCustomImpl examRepositoryCustom,
        ExamRepository examRepository,
        QuestionRepositoryCustom questionRepositoryCustom,
        QuestionService questionService,
        StudentRepositoryCustom studentRepositoryCustom
    ) {
        this.examRepositoryCustom = examRepositoryCustom;
        this.examRepository = examRepository;
        this.questionRepositoryCustom = questionRepositoryCustom;
        this.questionService = questionService;
        this.studentRepositoryCustom = studentRepositoryCustom;
    }

    @Override
    public Map<String, Object> search(ClassroomSearchDTO subjectCode, Integer page, Integer pageSize) {
        List<ExamDTO> lstExam = examRepositoryCustom.search(subjectCode, page, pageSize);
        Integer total = examRepositoryCustom.export(subjectCode).size();
        Map<String, Object> res = new HashMap<>();
        res.put("lstExam", lstExam);
        res.put("totalRecord", total);
        return res;
    }

    @Override
    public List<ExamDTO> export(ClassroomSearchDTO subjectCode) {
        return examRepositoryCustom.export(subjectCode);
    }

    @Override
    public List<ExamDTO> getListExamByStudentCode(String studentCode) {
        return examRepositoryCustom.getListExamByStudentCode(studentCode);
    }

    @Override
    public ExamDTO dataExamStudent(Long id) {
        // L???y th??ng tin c???a exam
        Optional<Exam> exam = examRepository.findById(id);
        ExamDTO examDTO = new ExamDTO();
        try {
            if (exam.isPresent()) {
                SimpleDateFormat dfm = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
                // Convert exam => examDTO
                Exam exam2 = exam.get();
                examDTO.setId(exam2.getId());
                examDTO.setBeginExam(dfm.parse(exam2.getBeginExam().toString()));
                examDTO.setDurationExam(exam2.getDurationExam());
                examDTO.setFinishExam(dfm.parse(exam2.getFinishExam().toString()));
                examDTO.setTitle(exam2.getTitle());
                examDTO.setQuestionData(exam2.getQuestionData());
                if (!examDTO.getQuestionData().isEmpty()) examDTO.setLstQuestion(this.getListQuestion(examDTO.getQuestionData()));
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return examDTO;
    }

    @Override
    public List<StudentDTO> getPointExamStudent(Long examId) {
        return studentRepositoryCustom.getPointExamStudent(examId);
    }

    // H??m l???y th??ng tin c???a ds c??u h???i
    private List<QuestionDTO> getListQuestion(String questionData) {
        String[] lstIdStr = questionData.split(",");
        long[] lstId = Arrays.asList(lstIdStr).stream().mapToLong(Long::parseLong).toArray();
        List<QuestionDTO> lstQuestion = new ArrayList<>();
        for (int i = 0; i < lstId.length; i++) {
            // T??m data question
            QuestionDTO questionDTO = questionService.findById(lstId[i]);
            questionDTO.setCreateDate(null);
            lstQuestion.add(questionDTO);
        }
        return lstQuestion;
    }
}
