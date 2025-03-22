package com.petadoption.service;

import com.petadoption.dto.AuthResponse;
import com.petadoption.dto.LoginRequest;
import com.petadoption.dto.RegisterRequest;
import com.petadoption.model.Adopter;
import com.petadoption.model.Shelter;
import com.petadoption.model.UserRole;
import com.petadoption.repository.AdopterRepository;
import com.petadoption.repository.ShelterRepository;
import com.petadoption.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {

    @Autowired
    private AdopterRepository adopterRepository;

    @Autowired
    private ShelterRepository shelterRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponse registerAdopter(RegisterRequest request) {
        if (adopterRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (adopterRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Adopter adopter = new Adopter();
        adopter.setName(request.getName());
        adopter.setUsername(request.getUsername());
        adopter.setEmail(request.getEmail());
        adopter.setPhone(request.getPhone());
        adopter.setPassword(passwordEncoder.encode(request.getPassword()));
        adopter.setRole(UserRole.ADOPTER);

        adopter = adopterRepository.save(adopter);

        UserDetails userDetails = new User(
                adopter.getUsername(),
                adopter.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADOPTER"))
        );

        String token = jwtUtil.generateToken(userDetails);
        return new AuthResponse(token, adopter.getAdopterId(), adopter.getUsername(), UserRole.ADOPTER);
    }

    public AuthResponse registerShelter(RegisterRequest request) {
        try {
            System.out.println("Starting shelter registration process...");
            System.out.println("Checking if username exists: " + request.getUsername());
            
            if (shelterRepository.existsByUsername(request.getUsername())) {
                System.out.println("Username already exists: " + request.getUsername());
                throw new RuntimeException("Username already exists");
            }
            
            System.out.println("Checking if email exists: " + request.getEmail());
            if (shelterRepository.existsByEmail(request.getEmail())) {
                System.out.println("Email already exists: " + request.getEmail());
                throw new RuntimeException("Email already exists");
            }

            System.out.println("Creating new shelter object...");
            Shelter shelter = new Shelter();
            shelter.setName(request.getName());
            shelter.setUsername(request.getUsername());
            shelter.setEmail(request.getEmail());
            shelter.setPhone(request.getPhone());
            shelter.setPassword(passwordEncoder.encode(request.getPassword()));
            shelter.setLocation(request.getLocation());
            shelter.setDescription(request.getDescription());
            shelter.setRole(UserRole.SHELTER);

            System.out.println("Saving shelter to database...");
            shelter = shelterRepository.save(shelter);
            System.out.println("Shelter saved successfully with ID: " + shelter.getShelterId());

            System.out.println("Creating user details for JWT...");
            UserDetails userDetails = new User(
                    shelter.getUsername(),
                    shelter.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_SHELTER"))
            );

            System.out.println("Generating JWT token...");
            String token = jwtUtil.generateToken(userDetails);
            
            System.out.println("Registration completed successfully");
            return new AuthResponse(token, shelter.getShelterId(), shelter.getUsername(), UserRole.SHELTER);
        } catch (Exception e) {
            System.err.println("Error in registerShelter: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public AuthResponse loginAdopter(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Adopter adopter = adopterRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (adopter.getRole() != UserRole.ADOPTER) {
                throw new RuntimeException("Invalid user type");
            }

            String token = jwtUtil.generateToken(userDetails);
            return new AuthResponse(token, adopter.getAdopterId(), adopter.getUsername(), UserRole.ADOPTER);
        } catch (Exception e) {
            throw new RuntimeException("Invalid username or password");
        }
    }

    public AuthResponse loginShelter(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Shelter shelter = shelterRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Shelter not found"));

            if (shelter.getRole() != UserRole.SHELTER) {
                throw new RuntimeException("Invalid user type");
            }

            String token = jwtUtil.generateToken(userDetails);
            return new AuthResponse(token, shelter.getShelterId(), shelter.getUsername(), UserRole.SHELTER);
        } catch (Exception e) {
            throw new RuntimeException("Invalid username or password");
        }
    }
} 