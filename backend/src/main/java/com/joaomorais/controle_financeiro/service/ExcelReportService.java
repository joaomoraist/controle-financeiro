package com.joaomorais.controle_financeiro.service;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import com.joaomorais.controle_financeiro.entity.Expense;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelReportService {

    public byte[] createExcel(List<Expense> expenses) {

        try (XSSFWorkbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            var sheet = workbook.createSheet("Despesas");

            var header = sheet.createRow(0);

            header.createCell(0).setCellValue("Data");
            header.createCell(1).setCellValue("Descrição");
            header.createCell(2).setCellValue("Valor");
            header.createCell(3).setCellValue("Categoria");
            header.createCell(4).setCellValue("Classificação");

            int rowNumber = 1;

            for (Expense expense : expenses) {
                var row = sheet.createRow(rowNumber++);

                row.createCell(0).setCellValue(expense.getDate().toString());
                row.createCell(1).setCellValue(expense.getDescription());
                row.createCell(2).setCellValue(expense.getValue().doubleValue());
                row.createCell(3).setCellValue(expense.getCategory().name());
                row.createCell(4).setCellValue(expense.getClassification().name());
            }

            workbook.write(outputStream);

            return outputStream.toByteArray();

        } catch (IOException exception) {
            throw new RuntimeException("Erro ao gerar arquivo Excel", exception);
        }
    }
}