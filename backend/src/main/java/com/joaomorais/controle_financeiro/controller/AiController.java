package com.joaomorais.controle_financeiro.controller;

import com.joaomorais.controle_financeiro.dto.MonthlyReportResponse;
import com.joaomorais.controle_financeiro.service.GeminiService;
import com.joaomorais.controle_financeiro.service.ReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final GeminiService geminiService;
    private final ReportService reportService;

    public AiController(
            GeminiService geminiService,
            ReportService reportService
    ) {
        this.geminiService = geminiService;
        this.reportService = reportService;
    }

    @GetMapping("/tip")
    public String getTip(
            @RequestParam int year,
            @RequestParam int month
    ) {
        MonthlyReportResponse report = reportService.monthly(year, month);

        return geminiService.generateTip(report);
    }
}