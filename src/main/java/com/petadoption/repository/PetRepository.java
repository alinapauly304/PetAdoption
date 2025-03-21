package com.petadoption.repository;

import com.petadoption.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByShelter_ShelterId(Long shelterId);
    List<Pet> findByType(String type);
    List<Pet> findByBreed(String breed);
} 