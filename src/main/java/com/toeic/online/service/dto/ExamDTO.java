package com.toeic.online.service.dto;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExamDTO {

    private Long id;

    private Date beginExam;

    private Integer durationExam;

    private Date finishExam;

    private String questionData;

    private String subjectCode;

    private String subjectName;

    private String title;

    private Boolean status;

    private Instant createDate;

    private String createName;

    private Instant updateDate;

    private String updateName;

    private List<QuestionDTO> lstQuestion;
}
