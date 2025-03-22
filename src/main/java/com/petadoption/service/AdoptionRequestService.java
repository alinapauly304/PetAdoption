package com.petadoption.service;

import com.petadoption.dto.AdoptionRequestDTO;
import com.petadoption.model.AdoptionRequest;
import com.petadoption.model.Pet;
import com.petadoption.model.Adopter;
import com.petadoption.model.RequestStatus;
import com.petadoption.repository.AdoptionRequestRepository;
import com.petadoption.repository.PetRepository;
import com.petadoption.repository.AdopterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdoptionRequestService {

    @Autowired
    private AdoptionRequestRepository adoptionRequestRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private AdopterRepository adopterRepository;

    @Transactional
    public AdoptionRequest createAdoptionRequest(AdoptionRequestDTO request) {
        try {
            System.out.println("Creating adoption request for pet ID: " + request.getPetId() + " and adopter ID: " + request.getAdopterId());
            
            Pet pet = petRepository.findById(request.getPetId())
                    .orElseThrow(() -> new RuntimeException("Pet not found with ID: " + request.getPetId()));
            
            Adopter adopter = adopterRepository.findById(request.getAdopterId())
                    .orElseThrow(() -> new RuntimeException("Adopter not found with ID: " + request.getAdopterId()));

            // Check if there's already a pending request for this pet from this adopter
            List<AdoptionRequest> existingRequests = adoptionRequestRepository
                    .findByPet_PetIdAndAdopter_AdopterIdAndStatus(request.getPetId(), request.getAdopterId(), RequestStatus.PENDING);
            
            if (!existingRequests.isEmpty()) {
                throw new RuntimeException("You already have a pending adoption request for this pet");
            }

            AdoptionRequest adoptionRequest = new AdoptionRequest();
            adoptionRequest.setPet(pet);
            adoptionRequest.setAdopter(adopter);
            adoptionRequest.setMessage(request.getMessage());
            adoptionRequest.setStatus(RequestStatus.PENDING);
            adoptionRequest.setRequestDate(LocalDateTime.now());

            System.out.println("Saving adoption request...");
            AdoptionRequest savedRequest = adoptionRequestRepository.save(adoptionRequest);
            System.out.println("Successfully created adoption request with ID: " + savedRequest.getId());
            return savedRequest;
        } catch (Exception e) {
            System.err.println("Error creating adoption request: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to create adoption request: " + e.getMessage());
        }
    }

    public List<AdoptionRequest> getAdoptionRequestsByAdopter(Long adopterId) {
        try {
            System.out.println("Fetching adoption requests for adopter ID: " + adopterId);
            List<AdoptionRequest> requests = adoptionRequestRepository.findByAdopter_AdopterId(adopterId);
            System.out.println("Found " + requests.size() + " requests");
            return requests;
        } catch (Exception e) {
            System.err.println("Error fetching adoption requests for adopter: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch adoption requests: " + e.getMessage());
        }
    }

    public List<AdoptionRequest> getAdoptionRequestsByPet(Long petId) {
        try {
            System.out.println("Fetching adoption requests for pet ID: " + petId);
            List<AdoptionRequest> requests = adoptionRequestRepository.findByPet_PetId(petId);
            System.out.println("Found " + requests.size() + " requests");
            return requests;
        } catch (Exception e) {
            System.err.println("Error fetching adoption requests for pet: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch adoption requests: " + e.getMessage());
        }
    }

    public List<AdoptionRequest> getAdoptionRequestsByShelter(Long shelterId) {
        try {
            System.out.println("Fetching adoption requests for shelter ID: " + shelterId);
            List<AdoptionRequest> requests = adoptionRequestRepository.findByPet_Shelter_ShelterId(shelterId);
            System.out.println("Found " + requests.size() + " requests");
            return requests;
        } catch (Exception e) {
            System.err.println("Error fetching adoption requests for shelter: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch adoption requests: " + e.getMessage());
        }
    }

    @Transactional
    public AdoptionRequest updateAdoptionRequestStatus(Long id, RequestStatus status) {
        try {
            System.out.println("Updating adoption request status for ID: " + id + " to: " + status);
            AdoptionRequest request = adoptionRequestRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Adoption request not found with ID: " + id));

            request.setStatus(status);
            request.setResponseDate(LocalDateTime.now());

            AdoptionRequest updatedRequest = adoptionRequestRepository.save(request);
            System.out.println("Successfully updated adoption request status");
            return updatedRequest;
        } catch (Exception e) {
            System.err.println("Error updating adoption request status: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to update adoption request status: " + e.getMessage());
        }
    }

    public Optional<AdoptionRequest> getAdoptionRequestById(Long id) {
        return adoptionRequestRepository.findById(id);
    }
} 