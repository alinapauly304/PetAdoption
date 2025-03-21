package com.petadoption.dto;

import com.petadoption.model.RequestStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestStatusUpdateDTO {
    @NotNull(message = "Status is required")
    private RequestStatus status;
} 