package com.petadoption.controller;

import com.petadoption.dto.PetRequest;
import com.petadoption.model.Pet;
import com.petadoption.service.PetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping
    public ResponseEntity<?> getAllPets() {
        try {
            System.out.println("Received request to fetch all pets");
            List<Pet> pets = petService.getAllPets();
            System.out.println("Successfully fetched " + pets.size() + " pets");
            return ResponseEntity.ok(pets);
        } catch (Exception e) {
            System.err.println("Error in getAllPets endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to fetch pets",
                    "error", e.getMessage()
                ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPetById(@PathVariable Long id) {
        try {
            System.out.println("Received request to fetch pet with ID: " + id);
            return petService.getPetById(id)
                    .map(pet -> {
                        System.out.println("Successfully fetched pet: " + pet.getName());
                        return ResponseEntity.ok(pet);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Error in getPetById endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to fetch pet",
                    "error", e.getMessage()
                ));
        }
    }

    @PostMapping
    public ResponseEntity<?> createPet(@Valid @RequestBody PetRequest request) {
        try {
            System.out.println("Received request to create new pet");
            System.out.println("Request details: " + request);
            
            if (request.getShelterId() == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Shelter ID is required"));
            }

            Pet pet = petService.createPet(request);
            System.out.println("Successfully created pet with ID: " + pet.getPetId());
            return ResponseEntity.ok(pet);
        } catch (IllegalArgumentException e) {
            System.err.println("Validation error in createPet endpoint: " + e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error in createPet endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to create pet",
                    "error", e.getMessage()
                ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePet(@PathVariable Long id, @Valid @RequestBody PetRequest request) {
        try {
            System.out.println("Received request to update pet with ID: " + id);
            Pet updatedPet = petService.updatePet(id, request);
            System.out.println("Successfully updated pet: " + updatedPet.getName());
            return ResponseEntity.ok(updatedPet);
        } catch (Exception e) {
            System.err.println("Error in updatePet endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to update pet",
                    "error", e.getMessage()
                ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        try {
            System.out.println("Received request to delete pet with ID: " + id);
            petService.deletePet(id);
            System.out.println("Successfully deleted pet with ID: " + id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error in deletePet endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to delete pet",
                    "error", e.getMessage()
                ));
        }
    }

    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<?> getPetsByShelter(@PathVariable Long shelterId) {
        try {
            System.out.println("Received request to fetch pets for shelter ID: " + shelterId);
            List<Pet> pets = petService.getPetsByShelter(shelterId);
            System.out.println("Successfully fetched " + pets.size() + " pets for shelter");
            return ResponseEntity.ok(pets);
        } catch (Exception e) {
            System.err.println("Error in getPetsByShelter endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to fetch pets for shelter",
                    "error", e.getMessage()
                ));
        }
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<?> getPetsByType(@PathVariable String type) {
        try {
            System.out.println("Received request to fetch pets of type: " + type);
            List<Pet> pets = petService.getPetsByType(type);
            System.out.println("Successfully fetched " + pets.size() + " pets of type " + type);
            return ResponseEntity.ok(pets);
        } catch (Exception e) {
            System.err.println("Error in getPetsByType endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to fetch pets by type",
                    "error", e.getMessage()
                ));
        }
    }

    @GetMapping("/breed/{breed}")
    public ResponseEntity<?> getPetsByBreed(@PathVariable String breed) {
        try {
            System.out.println("Received request to fetch pets of breed: " + breed);
            List<Pet> pets = petService.getPetsByBreed(breed);
            System.out.println("Successfully fetched " + pets.size() + " pets of breed " + breed);
            return ResponseEntity.ok(pets);
        } catch (Exception e) {
            System.err.println("Error in getPetsByBreed endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "message", "Failed to fetch pets by breed",
                    "error", e.getMessage()
                ));
        }
    }
} 