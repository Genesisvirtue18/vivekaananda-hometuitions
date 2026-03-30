package com.vivekanand.Controller;

import com.vivekanand.DTO.LanguageProficiencyDTO;
import com.vivekanand.DTO.TutorApplicationDTO;
import com.vivekanand.Entity.TutorApplication;
import com.vivekanand.Service.TutorApplicationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tutors")
public class TutorApplicationController {

    private final TutorApplicationService service;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public TutorApplicationController(TutorApplicationService service) {
        this.service = service;
    }

    @PostMapping("/apply")
    public ResponseEntity<TutorApplication> apply(
            @RequestPart("dto") TutorApplicationDTO dto,
            @RequestPart(required = false) MultipartFile photo,
            @RequestPart(required = false) MultipartFile aadhar
    ) throws IOException {

        System.out.println("Received DTO: " + dto);


        TutorApplication application = new TutorApplication();
        application.setName(dto.getName());
        application.setFatherName(dto.getFatherName());
        application.setQualification(dto.getQualification());
        application.setUniversity(dto.getUniversity());
        application.setPercentage(dto.getPercentage());
        application.setPassingYear(dto.getPassingYear());
        application.setInterCollege(dto.getInterCollege());
        application.setInterPercentage(dto.getInterPercentage());
        application.setSchoolName(dto.getSchoolName());
        application.setCurrentLocation(dto.getCurrentLocation());
        application.setPreferredLocation(dto.getPreferredLocation());
        application.setClassesHandled(dto.getClassesHandled());
        application.setSubjectsTaught(dto.getSubjectsTaught());
        application.setPreviousTutoringExperience(dto.getPreviousTutoringExperience());
        application.setClassesTaught(dto.getClassesTaught());
        application.setPhone(dto.getPhone());
        application.setAltPhone(dto.getAltPhone());
        application.setHasBike(dto.getHasBike());
        application.setSyllabus(dto.getSyllabus());

        // Languages & proficiency
        if (dto.getLanguages() != null && !dto.getLanguages().isEmpty()) {
            String langs = dto.getLanguages().stream()
                    .map(LanguageProficiencyDTO::getLanguage)
                    .collect(Collectors.joining(","));
            String profs = dto.getLanguages().stream()
                    .map(LanguageProficiencyDTO::getProficiency)
                    .collect(Collectors.joining(","));
            application.setLanguage(langs);
            application.setProficiency(profs);
        }

        // Handle photo
        if (photo != null && !photo.isEmpty()) {
            Path filePath = Paths.get(uploadDir, UUID.randomUUID() + "_" + photo.getOriginalFilename());
            Files.createDirectories(filePath.getParent());
            Files.copy(photo.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            application.setPhotoPath("uploads/" + filePath.getFileName());
        }

        // Handle aadhar
        if (aadhar != null && !aadhar.isEmpty()) {
            Path filePath = Paths.get(uploadDir, UUID.randomUUID() + "_" + aadhar.getOriginalFilename());
            Files.createDirectories(filePath.getParent());
            Files.copy(aadhar.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            application.setAadharPath("uploads/" + filePath.getFileName());
        }

        TutorApplication saved = service.save(application);
        return ResponseEntity.ok(saved);
    }



    @GetMapping("/all")
    public java.util.List<TutorApplication> getAllApplications() {
        return service.getAll();
    }

    @DeleteMapping("/deleteApplication/{id}")
    public String deleteTutor(@PathVariable Long id){
    service.deleteTutorApplication(id);
    return "Tutor Application Deleted Successfully";

    }


    @PutMapping("/update/{id}")
    public ResponseEntity<TutorApplication> updateApplication(
            @PathVariable Long id,
            @RequestPart("dto") TutorApplicationDTO dto,
            @RequestPart(required = false) MultipartFile photo,
            @RequestPart(required = false) MultipartFile aadhar
    ) throws IOException {

        TutorApplication existing = service.getById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        // Update fields
        existing.setName(dto.getName());
        existing.setFatherName(dto.getFatherName());
        existing.setQualification(dto.getQualification());
        existing.setUniversity(dto.getUniversity());
        existing.setPercentage(dto.getPercentage());
        existing.setPassingYear(dto.getPassingYear());
        existing.setInterCollege(dto.getInterCollege());
        existing.setInterPercentage(dto.getInterPercentage());
        existing.setSchoolName(dto.getSchoolName());
        existing.setCurrentLocation(dto.getCurrentLocation());
        existing.setPreferredLocation(dto.getPreferredLocation());
        existing.setClassesHandled(dto.getClassesHandled());
        existing.setSubjectsTaught(dto.getSubjectsTaught());
        existing.setPreviousTutoringExperience(dto.getPreviousTutoringExperience());
        existing.setClassesTaught(dto.getClassesTaught());
        existing.setPhone(dto.getPhone());
        existing.setAltPhone(dto.getAltPhone());
        existing.setHasBike(dto.getHasBike());
        existing.setSyllabus(dto.getSyllabus());

        // Languages
        if (dto.getLanguages() != null && !dto.getLanguages().isEmpty()) {
            String langs = dto.getLanguages().stream()
                    .map(LanguageProficiencyDTO::getLanguage)
                    .collect(Collectors.joining(","));
            String profs = dto.getLanguages().stream()
                    .map(LanguageProficiencyDTO::getProficiency)
                    .collect(Collectors.joining(","));
            existing.setLanguage(langs);
            existing.setProficiency(profs);
        }

        // Update photo if provided
        if (photo != null && !photo.isEmpty()) {
            // Delete old file if exists
            if (existing.getPhotoPath() != null) {
                Path oldFile = Paths.get(uploadDir, Paths.get(existing.getPhotoPath()).getFileName().toString());
                Files.deleteIfExists(oldFile);
            }

            // Save new file
            Path filePath = Paths.get(uploadDir, UUID.randomUUID() + "_" + photo.getOriginalFilename());
            Files.createDirectories(filePath.getParent());
            Files.copy(photo.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            existing.setPhotoPath("uploads/" + filePath.getFileName());
        }

        // Update aadhar if provided
        if (aadhar != null && !aadhar.isEmpty()) {
            // Delete old file if exists
            if (existing.getAadharPath() != null) {
                Path oldFile = Paths.get(uploadDir, Paths.get(existing.getAadharPath()).getFileName().toString());
                Files.deleteIfExists(oldFile);
            }

            // Save new file
            Path filePath = Paths.get(uploadDir, UUID.randomUUID() + "_" + aadhar.getOriginalFilename());
            Files.createDirectories(filePath.getParent());
            Files.copy(aadhar.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            existing.setAadharPath("uploads/" + filePath.getFileName());
        }

        TutorApplication updated = service.save(existing);
        return ResponseEntity.ok(updated);
    }

}
