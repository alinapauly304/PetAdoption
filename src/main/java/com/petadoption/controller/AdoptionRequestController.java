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

@RestController
@RequestMapping("/api/adoption-requests")
@CrossOrigin(origins = "*")
public class AdoptionRequestController {

    @Autowired
    private AdoptionRequestService adoptionRequestService;

    @PostMapping
    public ResponseEntity<AdoptionRequest> createAdoptionRequest(@Valid @RequestBody AdoptionRequestDTO request) {
        return ResponseEntity.ok(adoptionRequestService.createAdoptionRequest(request));
    }

    @GetMapping("/adopter/{adopterId}")
    public ResponseEntity<List<AdoptionRequest>> getAdoptionRequestsByAdopter(@PathVariable Long adopterId) {
        return ResponseEntity.ok(adoptionRequestService.getAdoptionRequestsByAdopter(adopterId));
    }

    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<AdoptionRequest>> getAdoptionRequestsByPet(@PathVariable Long petId) {
        return ResponseEntity.ok(adoptionRequestService.getAdoptionRequestsByPet(petId));
    }

    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<List<AdoptionRequest>> getAdoptionRequestsByShelter(@PathVariable Long shelterId) {
        return ResponseEntity.ok(adoptionRequestService.getAdoptionRequestsByShelter(shelterId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AdoptionRequest> updateAdoptionRequestStatus(
            @PathVariable Long id,
            @Valid @RequestBody RequestStatusUpdateDTO request) {
        return ResponseEntity.ok(adoptionRequestService.updateAdoptionRequestStatus(id, request.getStatus()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdoptionRequest> getAdoptionRequestById(@PathVariable Long id) {
        return adoptionRequestService.getAdoptionRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 