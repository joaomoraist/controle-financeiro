package src.main.java.com.joaomorais.controle_financeiro.service;

import org.springframework.stereotype.Service;
import src.main.java.com.joaomorais.controle_financeiro.controller.ReportController;
import src.main.java.com.joaomorais.controle_financeiro.dto.MonthlyReportResponse;
import src.main.java.com.joaomorais.controle_financeiro.entity.Expense;
import src.main.java.com.joaomorais.controle_financeiro.repository.ExpenseRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {

    private final ExpenseRepository expenseRepository;

    public ReportService(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    public MonthlyReportResponse monthly(int year, int month){
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Expense> expenses = expenseRepository.findByDateBetween (startDate, endDate);

        BigDecimal total = expenses.stream()
                .map(Expense::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new MonthlyReportResponse(year, month, total);
    }

}
