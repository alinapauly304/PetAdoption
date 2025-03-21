package com.petadoption;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.petadoption")
@EntityScan("com.petadoption.model")
@EnableJpaRepositories("com.petadoption.repository")
public class PetAdoptionApplication {
    public static void main(String[] args) {
        SpringApplication.run(PetAdoptionApplication.class, args);
    }
} 