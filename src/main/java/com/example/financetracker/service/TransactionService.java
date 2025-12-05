package com.example.financetracker.service;

import com.example.financetracker.dto.TransactionRequest;
import com.example.financetracker.dto.TransactionResponse;
import com.example.financetracker.entity.Transaction;
import com.example.financetracker.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public TransactionResponse create(TransactionRequest request) {
        Transaction tx = new Transaction();
        tx.setType(request.getType());
        tx.setAmount(request.getAmount());
        tx.setCategory(request.getCategory());
        tx.setDescription(request.getDescription());
        tx.setDate(request.getDate());
        tx.setCreatedAt(LocalDateTime.now());

        Transaction saved = repository.save(tx);
        return mapToResponse(saved);
    }

    public TransactionResponse update(Long id, TransactionRequest request) {
        Transaction tx = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));

        tx.setType(request.getType());
        tx.setAmount(request.getAmount());
        tx.setCategory(request.getCategory());
        tx.setDescription(request.getDescription());
        tx.setDate(request.getDate());

        Transaction saved = repository.save(tx);
        return mapToResponse(saved);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<TransactionResponse> getAll(String type, LocalDate start, LocalDate end) {
        List<Transaction> result;

        if (type != null && start != null && end != null) {
            result = repository.findByTypeIgnoreCaseAndDateBetween(type, start, end);
        } else if (type != null) {
            result = repository.findByTypeIgnoreCase(type);
        } else if (start != null && end != null) {
            result = repository.findByDateBetween(start, end);
        } else {
            result = repository.findAll();
        }

        return result.stream().map(this::mapToResponse).toList();
    }

    private TransactionResponse mapToResponse(Transaction tx) {
        return TransactionResponse.builder()
                .id(tx.getId())
                .type(tx.getType())
                .amount(tx.getAmount())
                .category(tx.getCategory())
                .description(tx.getDescription())
                .date(tx.getDate())
                .createdAt(tx.getCreatedAt())
                .build();
    }
}
