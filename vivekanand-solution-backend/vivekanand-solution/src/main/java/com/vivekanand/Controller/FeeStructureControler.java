package com.vivekanand.Controller;

import com.vivekanand.Entity.FeeStructure;
import com.vivekanand.Service.ExcelHelper;
import com.vivekanand.Service.FeeStructureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/fee-structure")
public class FeeStructureControler {

    @Autowired
    private FeeStructureService service;

    private final JdbcTemplate jdbcTemplate;

    public FeeStructureControler(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            List<FeeStructure> feeStructures = ExcelHelper.excelToFeeStructures(file.getInputStream());
            service.saveAll(feeStructures);
            return ResponseEntity.ok("✅ Fee structures uploaded successfully: " + feeStructures.size() + " records");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Failed to upload: " + e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<FeeStructure>> getFeeStructure(
            @RequestParam String className,
            @RequestParam String board,
            @RequestParam String location,
            @RequestParam String subjects) {

        // Split board by comma if frontend sends multiple (e.g., "CBSE / ICSE,STATE")
        String[] boards = board.split(",");

        // Build dynamic IN clause (?, ?, ? ...)
        String inClause = String.join(",", java.util.Collections.nCopies(boards.length, "?"));

        String sql = "SELECT f.id, f.class_name AS className, f.board, f.subjects, " +
                "f.tuition_fee AS tuitionFee, f.extra_student_fee AS extraStudentFee, " +
                "f.total_fee AS totalFee, f.time_per_day AS timePerDay, " +
                "f.days_per_week AS daysPerWeek, f.location " +
                "FROM fee_structure f " +
                "WHERE f.class_name = ? " +
                "AND f.board IN (" + inClause + ") " +
                "AND f.subjects = ? " +
                "AND f.location = ?";

        // Prepare params
        Object[] params = new Object[boards.length + 3];
        params[0] = className;
        System.arraycopy(boards, 0, params, 1, boards.length);
        params[boards.length + 1] = subjects;
        params[boards.length + 2] = location;

        List<FeeStructure> fees = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(FeeStructure.class),
                params
        );

        if (fees.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(fees);
    }

}
