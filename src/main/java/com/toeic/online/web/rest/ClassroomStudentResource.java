package com.toeic.online.web.rest;

import com.toeic.online.commons.ExportUtils;
import com.toeic.online.domain.Classroom;
import com.toeic.online.domain.ClassroomStudent;
import com.toeic.online.repository.ClassroomRepository;
import com.toeic.online.repository.ClassroomStudentRepository;
import com.toeic.online.service.ClassroomStudentService;
import com.toeic.online.service.dto.ClassroomStudentDTO;
import com.toeic.online.service.dto.ClassroomStudentSearchDTO;
import com.toeic.online.service.dto.ExcelColumn;
import com.toeic.online.service.dto.ExcelTitle;
import com.toeic.online.web.rest.errors.BadRequestAlertException;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.toeic.online.domain.ClassroomStudent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClassroomStudentResource {

    private final Logger log = LoggerFactory.getLogger(ClassroomStudentResource.class);

    private static final String ENTITY_NAME = "classroomStudent";

    private final ClassroomStudentService classroomStudentService;

    private final ClassroomRepository classroomRepository;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClassroomStudentRepository classroomStudentRepository;

    private final ExportUtils exportUtils;

    public ClassroomStudentResource(ClassroomStudentService classroomStudentService, ClassroomRepository classroomRepository, ClassroomStudentRepository classroomStudentRepository, ExportUtils exportUtils) {
        this.classroomStudentService = classroomStudentService;
        this.classroomRepository = classroomRepository;
        this.classroomStudentRepository = classroomStudentRepository;
        this.exportUtils = exportUtils;
    }

    /**
     * {@code POST  /classroom-students} : Create a new classroomStudent.
     *
     * @param classroomStudent the classroomStudent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new classroomStudent, or with status {@code 400 (Bad Request)} if the classroomStudent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/classroom-students")
    public ResponseEntity<ClassroomStudent> createClassroomStudent(@RequestBody ClassroomStudent classroomStudent)
        throws URISyntaxException {
        log.debug("REST request to save ClassroomStudent : {}", classroomStudent);
        if (classroomStudent.getId() != null) {
            throw new BadRequestAlertException("A new classroomStudent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClassroomStudent result = classroomStudentRepository.save(classroomStudent);
        return ResponseEntity
            .created(new URI("/api/classroom-students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /classroom-students/:id} : Updates an existing classroomStudent.
     *
     * @param id the id of the classroomStudent to save.
     * @param classroomStudent the classroomStudent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated classroomStudent,
     * or with status {@code 400 (Bad Request)} if the classroomStudent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the classroomStudent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/classroom-students/{id}")
    public ResponseEntity<ClassroomStudent> updateClassroomStudent(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ClassroomStudent classroomStudent
    ) throws URISyntaxException {
        log.debug("REST request to update ClassroomStudent : {}, {}", id, classroomStudent);
        if (classroomStudent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, classroomStudent.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!classroomStudentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ClassroomStudent result = classroomStudentRepository.save(classroomStudent);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, classroomStudent.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /classroom-students/:id} : Partial updates given fields of an existing classroomStudent, field will ignore if it is null
     *
     * @param id the id of the classroomStudent to save.
     * @param classroomStudent the classroomStudent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated classroomStudent,
     * or with status {@code 400 (Bad Request)} if the classroomStudent is not valid,
     * or with status {@code 404 (Not Found)} if the classroomStudent is not found,
     * or with status {@code 500 (Internal Server Error)} if the classroomStudent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/classroom-students/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ClassroomStudent> partialUpdateClassroomStudent(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ClassroomStudent classroomStudent
    ) throws URISyntaxException {
        log.debug("REST request to partial update ClassroomStudent partially : {}, {}", id, classroomStudent);
        if (classroomStudent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, classroomStudent.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!classroomStudentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ClassroomStudent> result = classroomStudentRepository
            .findById(classroomStudent.getId())
            .map(existingClassroomStudent -> {
                if (classroomStudent.getClassCode() != null) {
                    existingClassroomStudent.setClassCode(classroomStudent.getClassCode());
                }
                if (classroomStudent.getStudentCode() != null) {
                    existingClassroomStudent.setStudentCode(classroomStudent.getStudentCode());
                }

                return existingClassroomStudent;
            })
            .map(classroomStudentRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, classroomStudent.getId().toString())
        );
    }

    /**
     * {@code GET  /classroom-students} : get all the classroomStudents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of classroomStudents in body.
     */
    @GetMapping("/classroom-students")
    public List<ClassroomStudent> getAllClassroomStudents() {
        log.debug("REST request to get all ClassroomStudents");
        return classroomStudentRepository.findAll();
    }

    /**
     * {@code GET  /classroom-students/:id} : get the "id" classroomStudent.
     *
     * @param id the id of the classroomStudent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the classroomStudent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/classroom-students/{id}")
    public ResponseEntity<ClassroomStudent> getClassroomStudent(@PathVariable Long id) {
        log.debug("REST request to get ClassroomStudent : {}", id);
        Optional<ClassroomStudent> classroomStudent = classroomStudentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(classroomStudent);
    }

    /**
     * {@code DELETE  /classroom-students/:id} : delete the "id" classroomStudent.
     *
     * @param id the id of the classroomStudent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/classroom-students/{id}")
    public ResponseEntity<Void> deleteClassroomStudent(@PathVariable Long id) {
        log.debug("REST request to delete ClassroomStudent : {}", id);
        classroomStudentRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/classroom-student/search")
    public ResponseEntity<?> search(@RequestBody ClassroomStudentSearchDTO classroomStudentSearchDTO,
                                    @RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                    @RequestParam(value = "page-size", required = false, defaultValue = "10") Integer pageSize){
        Map<String, Object> result = classroomStudentService.search(classroomStudentSearchDTO.getClassCode(), classroomStudentSearchDTO.getStudentCode(), page, pageSize);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/classroom-student/export")
    public ResponseEntity<?> export(@RequestBody ClassroomStudentSearchDTO classroomStudentSearchDTO) throws Exception {
        List<ClassroomStudentDTO> listData = classroomStudentService.exportData(classroomStudentSearchDTO.getClassCode(), classroomStudentSearchDTO.getStudentCode());
        Classroom classroom = classroomRepository.findByCode(classroomStudentSearchDTO.getClassCode());
        List<ExcelColumn> lstColumn = buildColumnExport();
        String title = "Danh sách sinh viên thuộc lớp: " + classroom.getName();
        ExcelTitle excelTitle = new ExcelTitle(title, "", "");
        ByteArrayInputStream byteArrayInputStream = exportUtils.onExport(lstColumn, listData, 3, 0, excelTitle, true);
        InputStreamResource resource = new InputStreamResource(byteArrayInputStream);
        return ResponseEntity.ok()
            .contentLength(byteArrayInputStream.available())
            .contentType(MediaType.parseMediaType("application/octet-stream"))
            .body(resource);
    }

    private List<ExcelColumn> buildColumnExport(){
        List<ExcelColumn> lstColumn = new ArrayList<>();
        lstColumn.add(new ExcelColumn("studentCode", "Mã sinh viên", ExcelColumn.ALIGN_MENT.LEFT));
        lstColumn.add(new ExcelColumn("studentName", "Tên sinh viên",ExcelColumn.ALIGN_MENT.LEFT));
        lstColumn.add(new ExcelColumn("email", "Email",ExcelColumn.ALIGN_MENT.LEFT));
        lstColumn.add(new ExcelColumn("phone", "Số điện thoại",ExcelColumn.ALIGN_MENT.LEFT));
        return lstColumn;
    }
}
