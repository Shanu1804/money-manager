package in.abhishek.moneymanager.controller;

import in.abhishek.moneymanager.dto.ExpenseDTO;
import in.abhishek.moneymanager.entity.ProfileEntity;
import in.abhishek.moneymanager.service.EmailService;
import in.abhishek.moneymanager.service.ExcelService;
import in.abhishek.moneymanager.service.ExpenseService;
import in.abhishek.moneymanager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final ExcelService excelService;
    private final EmailService emailService;
    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<ExpenseDTO> addExpense(@RequestBody ExpenseDTO dto) {
        ExpenseDTO saved = expenseService.addExpense(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getExpenses() {
        List<ExpenseDTO> expenses = expenseService.getCurrentMonthExpensesForCurrentUser();
        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpenses(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    // ========== NEW ==========
    @GetMapping("/excel/download")
    public ResponseEntity<Resource> downloadExpenseExcel() throws Exception {
        Resource resource = excelService.generateExpenseExcel();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=expense_details.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(resource);
    }

    @GetMapping("/email")
    public ResponseEntity<String> emailExpenseExcel() {
        try {
            ProfileEntity profile = profileService.getCurrentProfile();
            Resource resource = excelService.generateExpenseExcel();
            byte[] excelBytes = resource.getContentAsByteArray();

            String subject = "Your Expense Excel Report";
            String body = "Hello " + profile.getFullName() + ",\n\n" +
                    "Please find your Expense Report attached to this email.\n\n" +
                    "Regards,\nMoney Manager Team";

            emailService.sendEmailWithAttachment(
                    profile.getEmail(),
                    subject,
                    body,
                    excelBytes,
                    "expense.xlsx"
            );

            return ResponseEntity.ok("Expense Excel report sent successfully to your email");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to send email: " + e.getMessage());
        }
    }
}