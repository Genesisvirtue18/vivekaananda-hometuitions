package com.vivekanand.Repository;

import com.vivekanand.Entity.ClassPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClassPriceRepository extends JpaRepository<ClassPrice, Long> {
    Optional<ClassPrice> findByClassName(String className);

}
