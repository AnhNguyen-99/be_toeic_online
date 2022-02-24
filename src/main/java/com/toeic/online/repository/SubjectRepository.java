package com.toeic.online.repository;

import com.toeic.online.domain.Subject;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Subject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    @Query(value = "SELECT * FROM subject s WHERE s.code = ?1", nativeQuery = true)
    Subject findByCode(String code);
}
