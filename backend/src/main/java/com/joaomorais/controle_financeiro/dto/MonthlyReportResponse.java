package com.joaomorais.controle_financeiro.dto;

import java.math.BigDecimal;
import java.util.Map;

public class MonthlyReportResponse {

    private int year;
    private  int month;
    private BigDecimal total;
    private BigDecimal necessary;
    private BigDecimal unexpected;
    private BigDecimal unnecessary;
    private Map <String, BigDecimal> byCategory;

    public MonthlyReportResponse(int year, int month, BigDecimal total, BigDecimal necessary, BigDecimal unexpected, BigDecimal unnecessary, Map<String, BigDecimal>byCategory){
        this.year = year;
        this.month = month;
        this.total = total;
        this.necessary = necessary;
        this.unexpected = unexpected;
        this.unnecessary = unnecessary;
        this.byCategory = byCategory;

    }
    public int getYear (){
        return year;
    }

    public int getMonth() {
        return month;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public BigDecimal getNecessary() {
        return necessary;
    }

    public BigDecimal getUnexpected() {
        return unexpected;
    }

    public BigDecimal getUnnecessary() {
        return unnecessary;
    }

    public Map<String, BigDecimal> getByCategory(){
        return byCategory;
    }

}
