package com.vivekanand.Repository;

import com.vivekanand.Entity.TutorApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TutorApplicationRepository extends JpaRepository<TutorApplication, Long> {
}
