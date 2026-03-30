package com.vivekanand.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    @ElementCollection
    private List<String> subjectsTaught; // ⬅ Keep it as a List

    private String previousTutoringExperience;
    private String classesTaught; // Classes you have previously taught
    private String phone;
    private String altPhone;
    private String hasBike; // "Yes" / "No"
    private String syllabus;
    private String language;
    private String proficiency;

    private String photoPath;   // store file path
    private String aadharPath;  // store file path
}
