package com.vivekanand.DTO;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorApplicationDTO {
    private String name;
    private String fatherName;
    private String qualification;
    private String university;
    private String percentage;
    private String passingYear;
    private String interCollege;
    private String interPercentage;
    private String schoolName;
    private String currentLocation;
    private String preferredLocation;
    private String classesHandled;
    private List<String> subjectsTaught;
    private String previousTutoringExperience;
    private String classesTaught;
    private String phone;
    private String altPhone;
    private String hasBike;
    private String syllabus;

    // Updated fields
    private List<LanguageProficiencyDTO> languages;  // ⬅ Now a list of objects


    @Override
    public String toString() {
        return "TutorApplicationDTO{" +
                "name='" + name + '\'' +
                ", fatherName='" + fatherName + '\'' +
                ", qualification='" + qualification + '\'' +
                ", university='" + university + '\'' +
                ", percentage='" + percentage + '\'' +
                ", passingYear='" + passingYear + '\'' +
                ", interCollege='" + interCollege + '\'' +
                ", interPercentage='" + interPercentage + '\'' +
                ", schoolName='" + schoolName + '\'' +
                ", currentLocation='" + currentLocation + '\'' +
                ", preferredLocation='" + preferredLocation + '\'' +
                ", classesHandled='" + classesHandled + '\'' +
                ", subjectsTaught=" + subjectsTaught +
                ", previousTutoringExperience='" + previousTutoringExperience + '\'' +
                ", classesTaught='" + classesTaught + '\'' +
                ", phone='" + phone + '\'' +
                ", altPhone='" + altPhone + '\'' +
                ", hasBike='" + hasBike + '\'' +
                ", syllabus='" + syllabus + '\'' +
                ", languages=" + languages +
                '}';
    }
}
