package br.edu.hub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.hub.entity.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByActivityIdOrderByCreatedAtAsc(Long activityId);

    boolean existsByActivityIdAndStudentEmail(Long activityId, String studentEmail);
}
