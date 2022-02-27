package com.toeic.online.service.impl;

import com.toeic.online.repository.impl.StudentRepositoryCustomImpl;
import com.toeic.online.service.StudentService;
import com.toeic.online.service.dto.SearchTeacherDTO;
import com.toeic.online.service.dto.StudentDTO;
import com.toeic.online.service.dto.TeacherDTO;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepositoryCustomImpl studentRepositoryCustom;

    public StudentServiceImpl(StudentRepositoryCustomImpl studentRepositoryCustom) {
        this.studentRepositoryCustom = studentRepositoryCustom;
    }

    @Override
    public Map<String, Object> search(SearchTeacherDTO searchTeacherDTO, Integer page, Integer pageSize) {
        List<StudentDTO> lstStudent = studentRepositoryCustom.search(searchTeacherDTO, page, pageSize);
        Integer total = studentRepositoryCustom.exportData(searchTeacherDTO).size();
        Map<String, Object> res = new HashMap<>();
        res.put("lstStudent", lstStudent);
        res.put("totalRecord", total);
        return res;
    }

    @Override
    public List<StudentDTO> exportData(SearchTeacherDTO searchTeacherDTO) {
        return studentRepositoryCustom.exportData(searchTeacherDTO);
    }

    @Override
    public ByteArrayInputStream getSampleFile() throws IOException {
        return null;
    }
}
