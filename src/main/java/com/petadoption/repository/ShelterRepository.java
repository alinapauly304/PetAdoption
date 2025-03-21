package com.petadoption.repository;

import com.petadoption.model.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ShelterRepository extends JpaRepository<Shelter, Long> {
    Optional<Shelter> findByUsername(String username);
    Optional<Shelter> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
} 