package in.abhishek.moneymanager.controller;

import in.abhishek.moneymanager.dto.IncomeDTO;
import in.abhishek.moneymanager.entity.ProfileEntity;
import in.abhishek.moneymanager.service.EmailService;
import in.abhishek.moneymanager.service.ExcelService;
import in.abhishek.moneymanager.service.IncomeService;
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
@RequestMapping("/incomes")

public class IncomeController {

    private final IncomeService incomeService;
    private final ExcelService excelService;
    private final EmailService emailService;
    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO dto){
        IncomeDTO saved = incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getIncomes(){
        List<IncomeDTO> incomes = incomeService.getCurrentMonthIncomesForCurrentUser();
        return ResponseEntity.ok(incomes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Void>> deleteIncome(@PathVariable Long id){
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/excel/download")
    public ResponseEntity<Resource> downloadIncomeExcel() throws Exception {
        Resource resource = excelService.generateIncomeExcel();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=income_details.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(resource);
    }

    @GetMapping("/email")   // or keep it as /email/income-excel if you prefer
    public ResponseEntity<String> emailIncomeExcel() {
        try {
            ProfileEntity profile = profileService.getCurrentProfile();
            Resource resource = excelService.generateIncomeExcel();
            byte[] excelBytes = resource.getContentAsByteArray();

            String subject = "Your Income Excel Report";
            String body = "Hello " + profile.getFullName() + ",\n\n" +
                    "Please find your Income Report attached to this email.\n\n" +
                    "Regards,\nMoney Manager Team";

            emailService.sendEmailWithAttachment(
                    profile.getEmail(),
                    subject,
                    body,
                    excelBytes,
                    "income.xlsx"
            );

            return ResponseEntity.ok("Income Excel report sent successfully to your email");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to send email: " + e.getMessage());
        }
    }
}
