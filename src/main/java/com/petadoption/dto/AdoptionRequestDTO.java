package com.petadoption.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AdoptionRequestDTO {
    @NotNull(message = "Pet ID is required")
    private Long petId;
} 