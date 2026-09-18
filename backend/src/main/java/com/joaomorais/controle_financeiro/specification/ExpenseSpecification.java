package src.main.java.com.joaomorais.controle_financeiro.specification;

import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;
import src.main.java.com.joaomorais.controle_financeiro.entity.Expense;
import src.main.java.com.joaomorais.controle_financeiro.enums.Category;
import src.main.java.com.joaomorais.controle_financeiro.enums.Classification;

public class ExpenseSpecification {

    public static Specification<Expense> filter(
            LocalDate startDate,
            LocalDate endDate,
            Category category,
            Classification classification) {

        return (root, query, criteriaBuilder) -> {

            var predicate = criteriaBuilder.conjunction();

            if (startDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.greaterThanOrEqualTo(root.get("date"), startDate)
                );
            }

            if (endDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.lessThanOrEqualTo(root.get("date"), endDate)
                );
            }

            if (category != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(root.get("category"), category)
                );
            }

            if (classification != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(root.get("classification"), classification)
                );
            }

            return predicate;
        };
    }
}
