package com.vivekanand.Controller;

import com.vivekanand.Entity.Tutor;
import com.vivekanand.Service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/tutors")
public class TutorController {

    private final TutorService tutorService;

    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }

    @PostMapping("/create")
    public Tutor createTutor(@RequestParam String name,
                             @RequestParam String subject,
                             @RequestParam String classes,
                             @RequestParam String experience,
                             @RequestParam String location,
                             @RequestParam(required = false, value = "image") MultipartFile image) throws IOException {

        Tutor tutor = new Tutor();
        tutor.setName(name);
        tutor.setSubject(subject);
        tutor.setClasses(classes);
        tutor.setExperience(experience);
        tutor.setLocation(location);

        return tutorService.createTutor(tutor, image);
    }

    // READ ALL
    @GetMapping
    public List<Tutor> getAllTutors() {
        return tutorService.getAllTutors();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Tutor getTutorById(@PathVariable Long id) {
        return tutorService.getTutorById(id)
                .orElseThrow(() -> new RuntimeException("Tutor not found with id: " + id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Tutor updateTutor(@PathVariable Long id,
                             @RequestParam String name,
                             @RequestParam String subject,
                             @RequestParam String classes,
                             @RequestParam String experience,
                             @RequestParam String location,
                             @RequestParam(required = false, value = "image") MultipartFile image) throws IOException {

        Tutor updatedTutor = new Tutor();
        updatedTutor.setName(name);
        updatedTutor.setSubject(subject);
        updatedTutor.setClasses(classes);
        updatedTutor.setExperience(experience);
        updatedTutor.setLocation(location);

        return tutorService.updateTutor(id, updatedTutor, image);
    }

    // DELETE
    // Controller
    @DeleteMapping("/{id}")
    public String deleteTutor(@PathVariable Long id) {
        tutorService.deleteTutor(id);
        return "Tutor deleted with id: " + id;
    }

}
