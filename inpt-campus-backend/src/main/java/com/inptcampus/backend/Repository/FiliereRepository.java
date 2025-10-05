package com.inptcampus.backend.Repository;

import com.inptcampus.backend.Model.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    Optional<Filiere> findByName(String name);
    boolean existsByName(String name);
    boolean existsByCode(String code);
}