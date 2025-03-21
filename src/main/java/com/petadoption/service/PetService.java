package com.petadoption.service;

import com.petadoption.dto.PetRequest;
import com.petadoption.model.Pet;
import com.petadoption.model.Shelter;
import com.petadoption.repository.PetRepository;
import com.petadoption.repository.ShelterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private ShelterRepository shelterRepository;

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }

    public Pet createPet(PetRequest request) {
        Shelter shelter = shelterRepository.findById(request.getShelterId())
                .orElseThrow(() -> new RuntimeException("Shelter not found"));

        Pet pet = new Pet();
        pet.setName(request.getName());
        pet.setType(request.getType());
        pet.setBreed(request.getBreed());
        pet.setAge(request.getAge());
        pet.setGender(request.getGender());
        pet.setImageUrl(request.getImageUrl());
        pet.setShelter(shelter);

        return petRepository.save(pet);
    }

    public Pet updatePet(Long id, PetRequest request) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        Shelter shelter = shelterRepository.findById(request.getShelterId())
                .orElseThrow(() -> new RuntimeException("Shelter not found"));

        pet.setName(request.getName());
        pet.setType(request.getType());
        pet.setBreed(request.getBreed());
        pet.setAge(request.getAge());
        pet.setGender(request.getGender());
        pet.setImageUrl(request.getImageUrl());
        pet.setShelter(shelter);

        return petRepository.save(pet);
    }

    public void deletePet(Long id) {
        if (!petRepository.existsById(id)) {
            throw new RuntimeException("Pet not found");
        }
        petRepository.deleteById(id);
    }

    public List<Pet> getPetsByShelter(Long shelterId) {
        return petRepository.findByShelter_ShelterId(shelterId);
    }

    public List<Pet> getPetsByType(String type) {
        return petRepository.findByType(type);
    }

    public List<Pet> getPetsByBreed(String breed) {
        return petRepository.findByBreed(breed);
    }
} 