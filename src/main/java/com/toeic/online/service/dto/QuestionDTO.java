package com.toeic.online.service.dto;

import com.toeic.online.domain.Choice;
import java.time.Instant;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {

    private Long id;
    private String questionType;
    private String questionTypeName;
    private String questionText;
    private String subjectCode;
    private String subjectName;
    private Integer level;
    private Float point;
    private Boolean status;
    private Instant createDate;
    private String createName;
    private Instant updateDate;
    private String updateName;
    private List<Choice> lstChoice;
}