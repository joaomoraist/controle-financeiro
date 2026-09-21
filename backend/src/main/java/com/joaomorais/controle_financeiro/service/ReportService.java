package src.main.java.com.joaomorais.controle_financeiro.service;

import org.springframework.stereotype.Service;
import src.main.java.com.joaomorais.controle_financeiro.controller.ReportController;
import src.main.java.com.joaomorais.controle_financeiro.dto.MonthlyReportResponse;
import src.main.java.com.joaomorais.controle_financeiro.entity.Expense;
import src.main.java.com.joaomorais.controle_financeiro.exception.InvalidReportPeriodException;
import src.main.java.com.joaomorais.controle_financeiro.repository.ExpenseRepository;
import src.main.java.com.joaomorais.controle_financeiro.enums.Classification;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {

    private final ExpenseRepository expenseRepository;

    public ReportService(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    public MonthlyReportResponse monthly(int year, int month){
        if (month <1 || month > 12){
            throw new InvalidReportPeriodException("O mês deve estar entre 1 e 12");
        }
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Expense> expenses = expenseRepository.findByDateBetween (startDate, endDate);

        BigDecimal total = expenses.stream()
                .map(Expense::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal necessary = expenses.stream()
                .filter(expense -> expense.getClassification() == Classification.NECESSARIO)
                .map(Expense::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal unexpected = expenses.stream()
                .filter(expense -> expense.getClassification() == Classification.IMPREVISTO)
                .map(Expense::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal unnecessary = expenses.stream()
                .filter(expense -> expense.getClassification() == Classification.DESNECESSARIO)
                .map(Expense::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, BigDecimal> byCategory = new HashMap<>();

        for (Expense expense : expenses){
          String category = expense.getCategory().name();

          byCategory.put(category, byCategory.getOrDefault(category, BigDecimal.ZERO)
                  .add(expense.getValue()));
        }
        return new MonthlyReportResponse(year, month, total, necessary, unnecessary, unexpected, byCategory);
    }

}
