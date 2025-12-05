package com.example.financetracker.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class TransactionRequest {

    @NotBlank
    private String type;

    @NotNull
    @Min(0)
    private Double amount;

    @NotBlank
    private String category;

    private String description;

    @NotNull
    private LocalDate date;

    public TransactionRequest() {}

    // ------
    // Getter
    // ------

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}