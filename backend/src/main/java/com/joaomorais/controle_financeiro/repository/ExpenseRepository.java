package src.main.java.com.joaomorais.controle_financeiro.repository;

import src.main.java.com.joaomorais.controle_financeiro.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}