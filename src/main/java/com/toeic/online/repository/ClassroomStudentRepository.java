package com.toeic.online.repository;

import com.toeic.online.domain.ClassroomStudent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ClassroomStudent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClassroomStudentRepository extends JpaRepository<ClassroomStudent, Long> {}
