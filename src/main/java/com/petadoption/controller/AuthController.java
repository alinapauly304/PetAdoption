package com.petadoption.controller;

import com.petadoption.dto.AuthResponse;
import com.petadoption.dto.LoginRequest;
import com.petadoption.dto.RegisterRequest;
import com.petadoption.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register/adopter")
    public ResponseEntity<AuthResponse> registerAdopter(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerAdopter(request));
    }

    @PostMapping("/register/shelter")
    public ResponseEntity<AuthResponse> registerShelter(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerShelter(request));
    }

    @PostMapping("/login/adopter")
    public ResponseEntity<AuthResponse> loginAdopter(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.loginAdopter(request));
    }

    @PostMapping("/login/shelter")
    public ResponseEntity<AuthResponse> loginShelter(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.loginShelter(request));
    }

    // Test endpoint to verify controller is working
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth controller is working!");
    }
} 