package com.toeic.online.service.dto;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {

    private Long id;
    private String code;
    private String fullName;
    private String email;
    private String phone;
    private Boolean status;
    private String statusStr;
    private String avatar;
    private Instant createDate;
    private String createName;
    private Instant updateDate;
    private String updateName;
}
