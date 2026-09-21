package com.joaomorais.controle_financeiro.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ExpenseNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleExpenseNotFound(ExpenseNotFoundException exception) {
        return exception.getMessage();
    }

    @ExceptionHandler(InvalidReportPeriodException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleInvalidReportPeriod(InvalidReportPeriodException exception){
        return exception.getMessage();
    }
}
