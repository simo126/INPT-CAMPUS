package com.inptcampus.backend.Repository;

import com.inptcampus.backend.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("""
    SELECT COUNT(r) > 0 
    FROM Reservation r 
    LEFT JOIN r.roommates rm
    WHERE (r.student.id = :studentId OR rm.id = :studentId) 
    AND r.status = 'ACTIVE'
""")
    boolean existsByStudentIdAndStatus(@Param("studentId") Long studentId);




}
