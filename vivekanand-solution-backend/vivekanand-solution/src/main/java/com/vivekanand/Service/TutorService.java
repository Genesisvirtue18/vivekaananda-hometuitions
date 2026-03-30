package com.vivekanand.Service;

import com.vivekanand.Entity.Tutor;
import com.vivekanand.Repository.TutorRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TutorService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final TutorRepository tutorRepository;

    public TutorService(TutorRepository tutorRepository) {
        this.tutorRepository = tutorRepository;
    }

    // CREATE
    public Tutor createTutor(Tutor tutor, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageFileName = storeImage(image);
            tutor.setImageUrl(imageFileName); // store only filename
        }
        return tutorRepository.save(tutor);
    }

    // UPDATE
    public Tutor updateTutor(Long id, Tutor updatedTutor, MultipartFile image) throws IOException {
        Tutor tutor = tutorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tutor not found with id: " + id));

        tutor.setName(updatedTutor.getName());
        tutor.setSubject(updatedTutor.getSubject());
        tutor.setClasses(updatedTutor.getClasses());
        tutor.setExperience(updatedTutor.getExperience());
        tutor.setLocation(updatedTutor.getLocation());

        if (image != null && !image.isEmpty()) {
            // Delete old image if exists
            deleteImageFile(tutor.getImageUrl());

            // Save new image
            String imageFileName = storeImage(image);
            tutor.setImageUrl(imageFileName);
        }

        return tutorRepository.save(tutor);
    }

    // READ ALL
    public List<Tutor> getAllTutors() {
        return tutorRepository.findAll();
    }

    // READ BY ID
    public Optional<Tutor> getTutorById(Long id) {
        return tutorRepository.findById(id);
    }

    // DELETE
    public void deleteTutor(Long id) {
        Tutor tutor = tutorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tutor not found with id: " + id));

        // Delete associated image
        deleteImageFile(tutor.getImageUrl());

        tutorRepository.deleteById(id);
    }

    // ===== Utility methods =====

    // Store image to uploads folder
    private String storeImage(MultipartFile image) throws IOException {
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);

        Files.write(filePath, image.getBytes());

        return fileName; // store only filename
    }

    // Delete image file if exists
    private void deleteImageFile(String imageFileName) {
        if (imageFileName != null && !imageFileName.isEmpty()) {
            Path path = Paths.get(uploadDir, imageFileName);
            try {
                boolean deleted = Files.deleteIfExists(path);
                if (!deleted) {
                    System.err.println("Warning: Image file did not exist: " + path.toAbsolutePath());
                } else {
                    System.out.println("Deleted image: " + path.toAbsolutePath());
                }
            } catch (IOException e) {
                System.err.println("Failed to delete image: " + path.toAbsolutePath());
                e.printStackTrace();
            }
        }
    }
}
