package com.vivekanand.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeeStructure {
    private String className;
    private String board; // was syllabus
    private String subjects;
    private String totalFee;
    private String extraStudentFee;
    private String timePerDay; // was time
    private String daysPerWeek; // was days
    private String location; // was locationType
}
