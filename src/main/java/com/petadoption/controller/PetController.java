package com.petadoption.controller;

import com.petadoption.dto.PetRequest;
import com.petadoption.model.Pet;
import com.petadoption.service.PetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petService.getPetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pet> createPet(@Valid @RequestBody PetRequest request) {
        return ResponseEntity.ok(petService.createPet(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @Valid @RequestBody PetRequest request) {
        return ResponseEntity.ok(petService.updatePet(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<List<Pet>> getPetsByShelter(@PathVariable Long shelterId) {
        return ResponseEntity.ok(petService.getPetsByShelter(shelterId));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Pet>> getPetsByType(@PathVariable String type) {
        return ResponseEntity.ok(petService.getPetsByType(type));
    }

    @GetMapping("/breed/{breed}")
    public ResponseEntity<List<Pet>> getPetsByBreed(@PathVariable String breed) {
        return ResponseEntity.ok(petService.getPetsByBreed(breed));
    }
} 