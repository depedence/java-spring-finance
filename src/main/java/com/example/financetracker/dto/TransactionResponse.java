package com.example.financetracker.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TransactionResponse {

    private Long id;
    private String type;
    private Double amount;
    private String category;
    private String description;
    private LocalDate date;
    private LocalDateTime createdAt;

    public TransactionResponse() {}

    public TransactionResponse(Long id, String type, Double amount, String category,
            String description, LocalDate date, LocalDateTime createdAt) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.date = date;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String type;
        private Double amount;
        private String category;
        private String description;
        private LocalDate date;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder type(String type) { this.type = type; return this; }
        public Builder amount(Double amount) { this.amount = amount; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder date(LocalDate date) { this.date = date; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public TransactionResponse build() {
            return new TransactionResponse(id, type, amount, category, description, date, createdAt);
        }
    }

    // ------
    // Getter
    // ------

    public Long getId() { return id; }
    public String getType() { return type; }
    public Double getAmount() { return amount; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public LocalDate getDate() { return date; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
