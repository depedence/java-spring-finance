package com.example.financetracker.repository;

import com.example.financetracker.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByTypeIgnoreCase(String type);

    List<Transaction> findByTypeIgnoreCaseAndDateBetween(String type, LocalDate start, LocalDate end);

    List<Transaction> findByDateBetween(LocalDate start, LocalDate end);

}