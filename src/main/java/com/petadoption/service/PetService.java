package com.petadoption.service;

import com.petadoption.dto.PetRequest;
import com.petadoption.model.Pet;
import com.petadoption.model.Shelter;
import com.petadoption.repository.PetRepository;
import com.petadoption.repository.ShelterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private ShelterRepository shelterRepository;

    public List<Pet> getAllPets() {
        try {
            System.out.println("Fetching all pets from database...");
            List<Pet> pets = petRepository.findAll();
            System.out.println("Found " + pets.size() + " pets in total");
            
            // Log each pet's details for debugging
            for (Pet pet : pets) {
                try {
                    System.out.println("Pet: " + pet.getName() + " (ID: " + pet.getPetId() + ", Type: " + pet.getType() + ")");
                    if (pet.getShelter() != null) {
                        System.out.println("  - Shelter: " + pet.getShelter().getName() + " (ID: " + pet.getShelter().getShelterId() + ")");
                    } else {
                        System.err.println("  - WARNING: Pet has no associated shelter!");
                    }
                } catch (Exception e) {
                    System.err.println("Error processing pet " + pet.getPetId() + ": " + e.getMessage());
                    e.printStackTrace();
                }
            }
            
            return pets;
        } catch (Exception e) {
            System.err.println("Error in getAllPets: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch all pets: " + e.getMessage());
        }
    }

    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }

    @Transactional
    public Pet createPet(PetRequest request) {
        try {
            System.out.println("Creating pet for shelter ID: " + request.getShelterId());
            
            if (request.getShelterId() == null) {
                throw new IllegalArgumentException("Shelter ID cannot be null");
            }

            Shelter shelter = shelterRepository.findById(request.getShelterId())
                    .orElseThrow(() -> new RuntimeException("Shelter not found with ID: " + request.getShelterId()));
            
            System.out.println("Found shelter: " + shelter.getName());

            Pet pet = new Pet();
            pet.setName(request.getName());
            pet.setType(request.getType());
            pet.setBreed(request.getBreed());
            pet.setAge(request.getAge());
            pet.setGender(request.getGender());
            pet.setImageUrl(request.getImageUrl());
            pet.setDescription(request.getDescription());
            pet.setShelter(shelter);

            System.out.println("Attempting to save pet: " + pet);
            Pet savedPet = petRepository.save(pet);
            System.out.println("Successfully saved pet with ID: " + savedPet.getPetId());
            return savedPet;
        } catch (Exception e) {
            System.err.println("Error in createPet: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to create pet: " + e.getMessage());
        }
    }

    @Transactional
    public Pet updatePet(Long id, PetRequest request) {
        try {
            Pet pet = petRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Pet not found with ID: " + id));

            Shelter shelter = shelterRepository.findById(request.getShelterId())
                    .orElseThrow(() -> new RuntimeException("Shelter not found with ID: " + request.getShelterId()));

            pet.setName(request.getName());
            pet.setType(request.getType());
            pet.setBreed(request.getBreed());
            pet.setAge(request.getAge());
            pet.setGender(request.getGender());
            pet.setImageUrl(request.getImageUrl());
            pet.setDescription(request.getDescription());
            pet.setShelter(shelter);

            return petRepository.save(pet);
        } catch (Exception e) {
            System.err.println("Error in updatePet: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to update pet: " + e.getMessage());
        }
    }

    @Transactional
    public void deletePet(Long id) {
        try {
            if (!petRepository.existsById(id)) {
                throw new RuntimeException("Pet not found with ID: " + id);
            }
            petRepository.deleteById(id);
        } catch (Exception e) {
            System.err.println("Error in deletePet: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to delete pet: " + e.getMessage());
        }
    }

    public List<Pet> getPetsByShelter(Long shelterId) {
        try {
            System.out.println("Fetching pets for shelter ID: " + shelterId);
            
            if (!shelterRepository.existsById(shelterId)) {
                throw new RuntimeException("Shelter not found with ID: " + shelterId);
            }
            
            List<Pet> pets = petRepository.findByShelter_ShelterId(shelterId);
            System.out.println("Found " + pets.size() + " pets for shelter " + shelterId);
            return pets;
        } catch (Exception e) {
            System.err.println("Error in getPetsByShelter: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch pets for shelter: " + e.getMessage());
        }
    }

    public List<Pet> getPetsByType(String type) {
        return petRepository.findByType(type);
    }

    public List<Pet> getPetsByBreed(String breed) {
        return petRepository.findByBreed(breed);
    }
} 