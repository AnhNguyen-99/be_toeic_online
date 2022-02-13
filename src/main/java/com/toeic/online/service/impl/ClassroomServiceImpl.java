package com.toeic.online.service.impl;

import com.toeic.online.repository.ClassroomRepositoryCustom;
import com.toeic.online.service.ClassroomService;
import com.toeic.online.service.dto.ClassroomDTO;
import org.apache.poi.hssf.usermodel.DVConstraint;
import org.apache.poi.hssf.usermodel.HSSFDataValidation;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.DataValidation;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.List;

@Service
@Transactional
public class ClassroomServiceImpl implements ClassroomService {

    private final ClassroomRepositoryCustom classroomRepositoryCustom;

    @Value("${import-file.sample-file}")
    private String folderSampleFile;

    public ClassroomServiceImpl(ClassroomRepositoryCustom classroomRepositoryCustom) {
        this.classroomRepositoryCustom = classroomRepositoryCustom;
    }

    @Override
    public List<ClassroomDTO> exportData() {
        return classroomRepositoryCustom.exportData();
    }

    @Override
    public ByteArrayInputStream getSampleFile() throws IOException {
        List<String> array1 = List.of(new String[]{"k1", "k2", "k3", "k4", "k5", "k6", "k7", "k8", "k9", "k10", "k11"});
        String path = folderSampleFile + "DS_Lophoc.xls";
        InputStream file = new BufferedInputStream(new FileInputStream(path));

        XSSFWorkbook wb = null;
        try {
            wb = new XSSFWorkbook(new File(path));
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
        XSSFSheet sheet = wb.getSheetAt(0);
//        CellRangeAddressList addressList = new CellRangeAddressList(1, 500, 1, 1);
//        DVConstraint dvConstraint = DVConstraint.createExplicitListConstraint(array1.toArray(new String[0]));
//        HSSFDataValidation dataValidation = new HSSFDataValidation(addressList, dvConstraint);
//        dataValidation.setSuppressDropDownArrow(false);
//        dataValidation.createErrorBox("Lỗi", "Vui lòng chọn đúng trong danh sách");
//        dataValidation.setShowErrorBox(true);
//        dataValidation.setErrorStyle(DataValidation.ErrorStyle.STOP);
//        sheet.addValidationData(dataValidation);

//        CellRangeAddressList addressList2 = new CellRangeAddressList(1, 500, 2, 2);
//        DVConstraint dvConstraint2 = DVConstraint.createExplicitListConstraint(array2.toArray(new String[0]));
//        HSSFDataValidation dataValidation2 = new HSSFDataValidation(addressList2, dvConstraint2);
//        dataValidation2.setSuppressDropDownArrow(false);
//        dataValidation2.createErrorBox("Chọn thứ", "Vui lòng chọn thứ");
//        dataValidation2.setShowErrorBox(true);
//        dataValidation2.setErrorStyle(DataValidation.ErrorStyle.STOP);
//        sheet.addValidationData(dataValidation2);

        file.close();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        wb.write(baos);
        wb.close();

        return new ByteArrayInputStream(baos.toByteArray());
    }
}
