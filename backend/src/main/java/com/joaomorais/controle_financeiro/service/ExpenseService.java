package src.main.java.com.joaomorais.controle_financeiro.service;

import org.springframework.stereotype.Service;
import src.main.java.com.joaomorais.controle_financeiro.dto.ExpenseRequest;
import src.main.java.com.joaomorais.controle_financeiro.entity.Expense;
import src.main.java.com.joaomorais.controle_financeiro.repository.ExpenseRepository;
import src.main.java.com.joaomorais.controle_financeiro.exception.ExpenseNotFoundException;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService (ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    // Criar
    public Expense create (Expense expense){
        return expenseRepository.save(expense);
    }
    // Listar
    public List<Expense> findAll(){
        return expenseRepository.findAll();
    }
    // Buscar por ID
    public Expense findById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException("Despesa não encontrada"));
    }
    // Atualizar
    public Expense update(Long id, ExpenseRequest request){
        Expense expense = findById(id);

        expense.setDate(request.getDate());
        expense.setDescription(request.getDescription());
        expense.setValue(request.getValue());
        expense.setCategory(request.getCategory());
        expense.setClassification(request.getClassification());

        return  expenseRepository.save(expense);
    }
    // Deletar
    public void delete(Long id){
        findById(id);
        expenseRepository.deleteById(id);
    }
}
