package com.example.financetracker.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String category;

    private String description;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Transaction() {}

    public Transaction(Long id, String type, Double amount, String category, String description, LocalDate date, LocalDateTime createdAt) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.date = date;
        this.createdAt = createdAt;
    }

    public static class Builder {
        private Long id;
        private String type;
        private Double amount;
        private String category;
        private String description;
        private LocalDate date;
        LocalDateTime createdAt;

        public Builder id(Long id) {
            this.id = id; return this;
        }

        public Builder type(String type) {
            this.type = type; return this;
        }

        public Builder amount(Double amount) {
            this.amount = amount; return this;
        }

        public Builder category(String category) {
            this.category = category; return this;
        }

        public Builder description(String description) {
            this.description = description; return this;
        }

        public Builder date(LocalDate date) {
            this.date = date; return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt; return this;
        }

        public Transaction build() {
            return new Transaction(id, type, amount, category, description, date, createdAt);
        }
    }

    // -----------------
    // Getter and Setter
    // -----------------

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Transaction)) return false;
        Transaction that = (Transaction) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() { return Objects.hash(id); }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", amount=" + amount +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", createdAt=" + createdAt +
                '}';
    }
}