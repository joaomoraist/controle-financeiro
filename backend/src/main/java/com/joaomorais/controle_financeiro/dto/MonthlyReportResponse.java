package src.main.java.com.joaomorais.controle_financeiro.dto;

import java.math.BigDecimal;

public class MonthlyReportResponse {

    private int year;
    private  int month;
    private BigDecimal total;

    public MonthlyReportResponse(int year, int month, BigDecimal total){
        this.year = year;
        this.month = month;
        this.total = total;
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
}
