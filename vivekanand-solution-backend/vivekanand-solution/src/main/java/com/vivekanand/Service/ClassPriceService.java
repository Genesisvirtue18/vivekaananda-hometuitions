package com.vivekanand.Service;

import com.vivekanand.Entity.ClassPrice;
import com.vivekanand.Repository.ClassPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClassPriceService {

    @Autowired
    private ClassPriceRepository repo;

    public List<ClassPrice> getAll() {
        return repo.findAll();
    }

    public ClassPrice add(ClassPrice classPrice) {
        return repo.save(classPrice);
    }

    public ClassPrice update(Long id, ClassPrice updated) {
        return repo.findById(id).map(existing -> {
            existing.setClassName(updated.getClassName());
            existing.setPrice(updated.getPrice());
            return repo.save(existing);
        }).orElseThrow(() -> new RuntimeException("Class not found"));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
