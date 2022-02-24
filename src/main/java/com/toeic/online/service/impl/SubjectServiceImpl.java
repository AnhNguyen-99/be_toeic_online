package com.toeic.online.service.impl;

import com.toeic.online.repository.SubjectRepositoryCustom;
import com.toeic.online.service.SubjectService;
import com.toeic.online.service.dto.SearchSubjectDTO;
import com.toeic.online.service.dto.SubjectDTO;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepositoryCustom subjectRepositoryCustom;

    @Value("${import-file.sample-file}")
    private String folderSampleFile;

    public SubjectServiceImpl(SubjectRepositoryCustom subjectRepositoryCustom) {
        this.subjectRepositoryCustom = subjectRepositoryCustom;
    }

    @Override
    public List<SubjectDTO> exportData(SearchSubjectDTO searchSubjectDTO) {
        return subjectRepositoryCustom.exportData(searchSubjectDTO);
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

    @Override
    public Map<String, Object> search(SearchSubjectDTO searchSubjectDTO, Integer page, Integer pageSize) {
        List<SubjectDTO> lstSubject = subjectRepositoryCustom.search(searchSubjectDTO, page, pageSize);
        Integer total = subjectRepositoryCustom.exportData(searchSubjectDTO).size();
        Map<String, Object> res = new HashMap<>();
        res.put("lstSubject", lstSubject);
        res.put("totalRecord", total);
        return res;
    }
}
