package src.main.java.com.joaomorais.controle_financeiro.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import src.main.java.com.joaomorais.controle_financeiro.dto.ExpenseRequest;
import src.main.java.com.joaomorais.controle_financeiro.entity.Expense;
import src.main.java.com.joaomorais.controle_financeiro.service.ExpenseService;
import jakarta.validation.Valid;
import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController (ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Expense create(@Valid @RequestBody ExpenseRequest request){
        Expense expense = new Expense();

        expense.setDate(request.getDate());
        expense.setDescription(request.getDescription());
        expense.setValue(request.getValue());
        expense.setCategory(request.getCategory());
        expense.setClassification(request.getClassification());

        return expenseService.create(expense);
    }

    @GetMapping
    public List<Expense> findAll(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate){
        if (startDate != null && endDate != null){
            return expenseService.findByPeriod(startDate, endDate);
        }
        return expenseService.findAll();
    }

    @GetMapping("/{id}")
    public Expense findById(@PathVariable Long id) {
        return expenseService.findById(id);
    }

    @PutMapping("/{id}")
    public Expense update(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequest request){
        return expenseService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        expenseService.delete(id);
    }
}
