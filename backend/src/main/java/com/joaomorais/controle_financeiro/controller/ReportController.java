package com.joaomorais.controle_financeiro.controller;

import com.joaomorais.controle_financeiro.dto.MonthlyReportResponse;
import com.joaomorais.controle_financeiro.entity.Expense;
import com.joaomorais.controle_financeiro.service.ExcelReportService;
import com.joaomorais.controle_financeiro.service.ReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;
    private final ExcelReportService excelReportService;

    public ReportController(ReportService reportService, ExcelReportService excelReportService){

        this.reportService = reportService;
        this.excelReportService = excelReportService;
    }

    @GetMapping("/monthly")
    public MonthlyReportResponse monthly(
            @RequestParam int year,
            @RequestParam int month){
        return reportService.monthly(year, month);
    }

    @GetMapping("/monthly/export")
    public ResponseEntity<byte[]> exportMonthly(
            @RequestParam int year,
            @RequestParam int month){

        List<Expense> expenses = reportService.findMonthlyExpenses(year, month);
        byte[] file = excelReportService.createExcel(expenses);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=relatorio-financeiro-" + year + "-" + month + ".xlsx"
                )
                .contentType(
                        MediaType.parseMediaType(
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        )
                )
                .body(file);
    }
}
