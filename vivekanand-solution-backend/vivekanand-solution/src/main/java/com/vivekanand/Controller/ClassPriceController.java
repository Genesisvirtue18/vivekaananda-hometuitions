package com.vivekanand.Controller;

import com.vivekanand.Entity.ClassPrice;
import com.vivekanand.Service.ClassPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pricing")
public class ClassPriceController {

    @Autowired
    private ClassPriceService service;

    @GetMapping
    public List<ClassPrice> getAllPrices() {
        return service.getAll();
    }

    @PostMapping
    public ClassPrice addPrice(@RequestBody ClassPrice classPrice) {
        return service.add(classPrice);
    }

    @PutMapping("/{id}")
    public ClassPrice updatePrice(@PathVariable Long id, @RequestBody ClassPrice classPrice) {
        return service.update(id, classPrice);
    }

    @DeleteMapping("/{id}")
    public void deletePrice(@PathVariable Long id) {
        service.delete(id);
    }
}
