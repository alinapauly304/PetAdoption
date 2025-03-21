package com.petadoption.repository;

import com.petadoption.model.AdoptionRequest;
import com.petadoption.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
    List<AdoptionRequest> findByAdopter_AdopterId(Long adopterId);
    List<AdoptionRequest> findByPet_PetId(Long petId);
    List<AdoptionRequest> findByStatus(RequestStatus status);
    List<AdoptionRequest> findByPet_Shelter_ShelterId(Long shelterId);
} 