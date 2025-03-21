package com.petadoption.service;

import com.petadoption.model.Shelter;
import com.petadoption.repository.ShelterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShelterService {

    @Autowired
    private ShelterRepository shelterRepository;

    public List<Shelter> getAllShelters() {
        return shelterRepository.findAll();
    }

    public Optional<Shelter> getShelterById(Long id) {
        return shelterRepository.findById(id);
    }

    public Shelter createShelter(Shelter shelter) {
        return shelterRepository.save(shelter);
    }

    public Shelter updateShelter(Long id, Shelter shelter) {
        Shelter existingShelter = shelterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shelter not found"));

        existingShelter.setName(shelter.getName());
        existingShelter.setLocation(shelter.getLocation());
        existingShelter.setPhone(shelter.getPhone());
        existingShelter.setDescription(shelter.getDescription());
        existingShelter.setEmail(shelter.getEmail());

        return shelterRepository.save(existingShelter);
    }

    public void deleteShelter(Long id) {
        if (!shelterRepository.existsById(id)) {
            throw new RuntimeException("Shelter not found");
        }
        shelterRepository.deleteById(id);
    }
} 