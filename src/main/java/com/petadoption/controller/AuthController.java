package com.petadoption.controller;

import com.petadoption.dto.AuthResponse;
import com.petadoption.dto.LoginRequest;
import com.petadoption.dto.RegisterRequest;
import com.petadoption.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public ResponseEntity<?> registerShelter(@RequestBody RegisterRequest request) {
        try {
            System.out.println("Received shelter registration request: " + request);
            AuthResponse response = authService.registerShelter(request);
            System.out.println("Successfully registered shelter: " + response);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.err.println("Error registering shelter: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            System.err.println("Unexpected error registering shelter: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of("message", "An unexpected error occurred during registration"));
        }
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