package src.main.java.com.joaomorais.controle_financeiro.repository;

import src.main.java.com.joaomorais.controle_financeiro.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}