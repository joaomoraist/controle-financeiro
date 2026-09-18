package src.main.java.com.joaomorais.controle_financeiro.repository;

import src.main.java.com.joaomorais.controle_financeiro.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long>, JpaSpecificationExecutor<Expense> {
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}