package com.toeic.online.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClassroomDTO {

    private Long id;
    private String code;
    private String name;
    private String teacherCode;
    private String teacherName;
    private Boolean status;
    private Instant createDate;
    private String createName;
    private Instant updateDate;
    private String updateName;
    private String statusStr;
}
