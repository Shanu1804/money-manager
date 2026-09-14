package in.abhishek.moneymanager.service;

import in.abhishek.moneymanager.entity.ExpenseEntity;
import in.abhishek.moneymanager.entity.IncomeEntity;
import in.abhishek.moneymanager.entity.ProfileEntity;
import in.abhishek.moneymanager.repository.ExpenseRepository;
import in.abhishek.moneymanager.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;   // ← added
    private final ProfileService profileService;

    // ==================== INCOME (existing - do not change) ====================
    public Resource generateIncomeExcel() throws Exception {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> incomes = incomeRepository.findByProfileIdOrderByIdDesc(profile.getId());

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Income Details");

        // Header
        Row headerRow = sheet.createRow(0);
        String[] headers = {"S.No", "Name", "Category", "Amount", "Date"};

        CellStyle headerStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        headerStyle.setFont(font);

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Data
        int rowNum = 1;
        for (IncomeEntity income : incomes) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(rowNum - 1);
            row.createCell(1).setCellValue(income.getName());
            row.createCell(2).setCellValue(
                    income.getCategory() != null ? income.getCategory().getName() : "N/A"
            );
            row.createCell(3).setCellValue(income.getAmount().doubleValue());
            row.createCell(4).setCellValue(income.getDate().toString());
        }

        // Auto size columns
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayResource(out.toByteArray());
    }

    // ==================== EXPENSE (new) ====================
    public Resource generateExpenseExcel() throws Exception {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> expenses = expenseRepository.findByProfileIdOrderByIdDesc(profile.getId());

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Expense Details");

        // Header
        Row headerRow = sheet.createRow(0);
        String[] headers = {"S.No", "Name", "Category", "Amount", "Date"};

        CellStyle headerStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        headerStyle.setFont(font);

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Data
        int rowNum = 1;
        for (ExpenseEntity expense : expenses) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(rowNum - 1);
            row.createCell(1).setCellValue(expense.getName());
            row.createCell(2).setCellValue(
                    expense.getCategory() != null ? expense.getCategory().getName() : "N/A"
            );
            row.createCell(3).setCellValue(expense.getAmount().doubleValue());
            row.createCell(4).setCellValue(expense.getDate().toString());
        }

        // Auto size columns
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayResource(out.toByteArray());
    }
}