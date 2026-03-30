package com.vivekanand.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fee_structure")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeeStructure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String className;
    private String board;
    private String subjects;
    private Double tuitionFee;
    private Double extraStudentFee;
    private Double totalFee;
    private String timePerDay;
    private String daysPerWeek;
    private String location;
}
