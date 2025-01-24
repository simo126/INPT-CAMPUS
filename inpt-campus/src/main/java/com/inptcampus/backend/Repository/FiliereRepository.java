package com.inptcampus.backend.Repository;

import com.inptcampus.backend.Model.Filliere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface FiliereRepository extends JpaRepository<Filliere, Long> {

    @Query("SELECT f.name FROM Filliere f WHERE f.id = :id")
    String findNameById(Long id);
}
