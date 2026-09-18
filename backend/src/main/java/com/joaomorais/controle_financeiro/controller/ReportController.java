package src.main.java.com.joaomorais.controle_financeiro.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import src.main.java.com.joaomorais.controle_financeiro.dto.MonthlyReportResponse;
import src.main.java.com.joaomorais.controle_financeiro.service.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService){
        this.reportService = reportService;
    }

    @GetMapping("/monthly")
    public MonthlyReportResponse monthly(
            @RequestParam int year,
            @RequestParam int month){
        return reportService.monthly(year, month);
    }
}
