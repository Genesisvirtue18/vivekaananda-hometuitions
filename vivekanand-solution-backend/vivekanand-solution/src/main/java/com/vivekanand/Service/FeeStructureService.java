package com.vivekanand.Service;

import com.vivekanand.Entity.FeeStructure;
import com.vivekanand.Repository.FeeStructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeeStructureService {
    @Autowired
    private FeeStructureRepository repository;

    public List<FeeStructure> saveAll(List<FeeStructure> feeStructures) {
        return repository.saveAll(feeStructures);
    }
}
