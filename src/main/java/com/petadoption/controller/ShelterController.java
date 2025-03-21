package com.petadoption.controller;

import com.petadoption.model.Shelter;
import com.petadoption.service.ShelterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shelters")
@CrossOrigin(origins = "*")
public class ShelterController {

    @Autowired
    private ShelterService shelterService;

    @GetMapping
    public ResponseEntity<List<Shelter>> getAllShelters() {
        return ResponseEntity.ok(shelterService.getAllShelters());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shelter> getShelterById(@PathVariable Long id) {
        return shelterService.getShelterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Shelter> createShelter(@Valid @RequestBody Shelter shelter) {
        return ResponseEntity.ok(shelterService.createShelter(shelter));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shelter> updateShelter(@PathVariable Long id, @Valid @RequestBody Shelter shelter) {
        return ResponseEntity.ok(shelterService.updateShelter(id, shelter));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShelter(@PathVariable Long id) {
        shelterService.deleteShelter(id);
        return ResponseEntity.ok().build();
    }
} 