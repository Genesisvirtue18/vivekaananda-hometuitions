package com.vivekanand.Service;


import com.vivekanand.Entity.TutorApplication;
import com.vivekanand.Repository.TutorApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorApplicationService {

    private final TutorApplicationRepository repository;

    public TutorApplicationService(TutorApplicationRepository repository) {
        this.repository = repository;
    }

    public TutorApplication save(TutorApplication application) {
        return repository.save(application);
    }

    public List<TutorApplication> getAll() {
        return repository.findAll();
    }

    public void deleteTutorApplication(Long id){
        if(!repository.existsById(id)){
            throw new RuntimeException("Application was not found with id "+ id);

        }
        repository.deleteById(id);
    }

    public TutorApplication getById(Long id) {
        return repository.findById(id).orElse(null);
    }

}
