package com.petadoption.repository;

import com.petadoption.model.Adopter;
import com.petadoption.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdopterRepository extends JpaRepository<Adopter, Long> {
    Optional<Adopter> findByUsername(String username);
    Optional<Adopter> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<Adopter> findByUsernameAndRole(String username, UserRole role);
} 