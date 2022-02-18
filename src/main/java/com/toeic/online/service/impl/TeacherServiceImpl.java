package com.toeic.online.service.impl;

import com.toeic.online.repository.TeacherRepositoryCustom;
import com.toeic.online.service.TeacherService;
import com.toeic.online.service.dto.ClassroomStudentDTO;
import com.toeic.online.service.dto.SearchTeacherDTO;
import com.toeic.online.service.dto.TeacherDTO;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepositoryCustom teacherRepositoryCustom;

    @Value("${import-file.sample-file}")
    private String folderSampleFile;

    public TeacherServiceImpl(TeacherRepositoryCustom teacherRepositoryCustom) {
        this.teacherRepositoryCustom = teacherRepositoryCustom;
    }

    @Override
    public Map<String, Object> search(SearchTeacherDTO searchTeacherDTO, Integer page, Integer pageSize) {
        List<TeacherDTO> lstTeacher = teacherRepositoryCustom.search(searchTeacherDTO, page, pageSize);
        Integer total = teacherRepositoryCustom.exportData(searchTeacherDTO).size();
        Map<String, Object> res = new HashMap<>();
        res.put("lstTeacher", lstTeacher);
        res.put("totalRecord", total);
        return res;
    }

    @Override
    public List<TeacherDTO> exportData(SearchTeacherDTO searchTeacherDTO) {
        return teacherRepositoryCustom.exportData(searchTeacherDTO);
    }

    @Override
    public ByteArrayInputStream getSampleFile() throws IOException {
        String path = folderSampleFile + "DS_Monhoc.xlsx";
        InputStream file = new BufferedInputStream(new FileInputStream(path));

        XSSFWorkbook wb = null;
        try {
            wb = new XSSFWorkbook(new File(path));
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
        XSSFSheet sheet = wb.getSheetAt(0);
        file.close();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        wb.write(baos);
        wb.close();

        return new ByteArrayInputStream(baos.toByteArray());
    }
}
