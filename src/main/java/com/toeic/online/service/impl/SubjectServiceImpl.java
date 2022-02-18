package com.toeic.online.service.impl;

import com.toeic.online.repository.SubjectRepositoryCustom;
import com.toeic.online.service.SubjectService;
import com.toeic.online.service.dto.SubjectDTO;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.List;

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
    public List<SubjectDTO> exportData() {
        return subjectRepositoryCustom.exportData();
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
