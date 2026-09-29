package com.joaomorais.controle_financeiro.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.joaomorais.controle_financeiro.dto.MonthlyReportResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final Client client;

    public GeminiService(@Value("${gemini.api-key}") String apiKey) {
        this.client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String generateTip(MonthlyReportResponse report) {

        String prompt = """
                Analise o seguinte relatório financeiro mensal e forneça uma dica prática para ajudar o usuário a melhorar sua organização financeira.

                Mês: %d/%d
                Total gasto: R$ %s
                Gastos necessários: R$ %s
                Gastos imprevistos: R$ %s
                Gastos desnecessários: R$ %s

                Gastos por categoria:
                %s

                Responda em português do Brasil.
                Seja objetivo e direto, e faça uma boa recomendação em poucas linhas.
                """.formatted(
                report.getMonth(),
                report.getYear(),
                report.getTotal(),
                report.getNecessary(),
                report.getUnexpected(),
                report.getUnnecessary(),
                report.getByCategory()
        );

        GenerateContentResponse response = client.models.generateContent(
                "gemini-3.8-flash",
                prompt,
                null
        );

        return response.text();
    }
}