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
        if (shelterRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (shelterRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Shelter shelter = new Shelter();
        shelter.setName(request.getName());
        shelter.setUsername(request.getUsername());
        shelter.setEmail(request.getEmail());
        shelter.setPhone(request.getPhone());
        shelter.setPassword(passwordEncoder.encode(request.getPassword()));
        shelter.setLocation(request.getLocation());
        shelter.setDescription(request.getDescription());
        shelter.setRole(UserRole.SHELTER);

        shelter = shelterRepository.save(shelter);

        UserDetails userDetails = new User(
                shelter.getUsername(),
                shelter.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_SHELTER"))
        );

        String token = jwtUtil.generateToken(userDetails);
        return new AuthResponse(token, shelter.getShelterId(), shelter.getUsername(), UserRole.SHELTER);
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