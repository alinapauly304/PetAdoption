package com.petadoption.service;

import com.petadoption.dto.AdoptionRequestDTO;
import com.petadoption.model.AdoptionRequest;
import com.petadoption.model.Pet;
import com.petadoption.model.RequestStatus;
import com.petadoption.repository.AdoptionRequestRepository;
import com.petadoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdoptionRequestService {

    @Autowired
    private AdoptionRequestRepository adoptionRequestRepository;

    @Autowired
    private PetRepository petRepository;

    public AdoptionRequest createAdoptionRequest(AdoptionRequestDTO request) {
        Pet pet = petRepository.findById(request.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        AdoptionRequest adoptionRequest = new AdoptionRequest();
        adoptionRequest.setPet(pet);
        adoptionRequest.setStatus(RequestStatus.PENDING);
        adoptionRequest.setRequestDate(LocalDateTime.now());

        return adoptionRequestRepository.save(adoptionRequest);
    }

    public List<AdoptionRequest> getAdoptionRequestsByAdopter(Long adopterId) {
        return adoptionRequestRepository.findByAdopter_AdopterId(adopterId);
    }

    public List<AdoptionRequest> getAdoptionRequestsByPet(Long petId) {
        return adoptionRequestRepository.findByPet_PetId(petId);
    }

    public List<AdoptionRequest> getAdoptionRequestsByShelter(Long shelterId) {
        return adoptionRequestRepository.findByPet_Shelter_ShelterId(shelterId);
    }

    public AdoptionRequest updateAdoptionRequestStatus(Long id, RequestStatus status) {
        AdoptionRequest request = adoptionRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Adoption request not found"));

        request.setStatus(status);
        request.setResponseDate(LocalDateTime.now());

        return adoptionRequestRepository.save(request);
    }

    public Optional<AdoptionRequest> getAdoptionRequestById(Long id) {
        return adoptionRequestRepository.findById(id);
    }
} 