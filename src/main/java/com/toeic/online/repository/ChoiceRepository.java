package com.toeic.online.repository;

import com.toeic.online.domain.Choice;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Choice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChoiceRepository extends JpaRepository<Choice, Long> {}
