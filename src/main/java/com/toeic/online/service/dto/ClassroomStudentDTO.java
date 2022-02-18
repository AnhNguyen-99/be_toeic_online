package com.toeic.online.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClassroomStudentDTO {

    private Long id;
    private String classCode;
    private String studentCode;
    private String studentName;
    private String email;
    private String phone;
}
