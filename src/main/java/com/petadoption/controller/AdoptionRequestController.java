package com.petadoption.controller;

import com.petadoption.dto.AdoptionRequestDTO;
import com.petadoption.dto.RequestStatusUpdateDTO;
import com.petadoption.model.AdoptionRequest;
import com.petadoption.service.AdoptionRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/adoption-requests")
@CrossOrigin(origins = "*")
public class AdoptionRequestController {

    @Autowired
    private AdoptionRequestService adoptionRequestService;

    @PostMapping
    public ResponseEntity<?> createAdoptionRequest(@Valid @RequestBody AdoptionRequestDTO request) {
        try {
            System.out.println("Received request to create adoption request");
            System.out.println("Request details: " + request);
            
            if (request.getPetId() == null || request.getAdopterId() == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Both Pet ID and Adopter ID are required"));
            }

            AdoptionRequest adoptionRequest = adoptionRequestService.createAdoptionRequest(request);
            System.out.println("Successfully created adoption request with ID: " + adoptionRequest.getId());
            return ResponseEntity.ok(adoptionRequest);
        } catch (IllegalArgumentException e) {
            System.err.println("Validation error in createAdoptionRequest endpoint: " + e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error in createAdoptionRequest endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to create adoption request",
                    "error", e.getMessage()
                ));
        }
    }

    @GetMapping("/adopter/{adopterId}")
    public ResponseEntity<?> getAdoptionRequestsByAdopter(@PathVariable Long adopterId) {
        try {
            System.out.println("Received request to fetch adoption requests for adopter ID: " + adopterId);
            List<AdoptionRequest> requests = adoptionRequestService.getAdoptionRequestsByAdopter(adopterId);
            System.out.println("Successfully fetched " + requests.size() + " requests");
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            System.err.println("Error in getAdoptionRequestsByAdopter endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to fetch adoption requests",
                    "error", e.getMessage()
                ));
        }
    }

    @GetMapping("/pet/{petId}")
    public ResponseEntity<?> getAdoptionRequestsByPet(@PathVariable Long petId) {
        try {
            System.out.println("Received request to fetch adoption requests for pet ID: " + petId);
            List<AdoptionRequest> requests = adoptionRequestService.getAdoptionRequestsByPet(petId);
            System.out.println("Successfully fetched " + requests.size() + " requests");
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            System.err.println("Error in getAdoptionRequestsByPet endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to fetch adoption requests",
                    "error", e.getMessage()
                ));
        }
    }

    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<?> getAdoptionRequestsByShelter(@PathVariable Long shelterId) {
        try {
            System.out.println("Received request to fetch adoption requests for shelter ID: " + shelterId);
            List<AdoptionRequest> requests = adoptionRequestService.getAdoptionRequestsByShelter(shelterId);
            System.out.println("Successfully fetched " + requests.size() + " requests");
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            System.err.println("Error in getAdoptionRequestsByShelter endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to fetch adoption requests",
                    "error", e.getMessage()
                ));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateAdoptionRequestStatus(
            @PathVariable Long id,
            @Valid @RequestBody RequestStatusUpdateDTO request) {
        try {
            System.out.println("Received request to update adoption request status for ID: " + id);
            System.out.println("New status: " + request.getStatus());
            
            AdoptionRequest updatedRequest = adoptionRequestService.updateAdoptionRequestStatus(id, request.getStatus());
            System.out.println("Successfully updated adoption request status");
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            System.err.println("Error in updateAdoptionRequestStatus endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to update adoption request status",
                    "error", e.getMessage()
                ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdoptionRequestById(@PathVariable Long id) {
        try {
            System.out.println("Received request to fetch adoption request with ID: " + id);
            return adoptionRequestService.getAdoptionRequestById(id)
                    .map(request -> {
                        System.out.println("Successfully fetched adoption request");
                        return ResponseEntity.ok(request);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Error in getAdoptionRequestById endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to fetch adoption request",
                    "error", e.getMessage()
                ));
        }
    }
} 