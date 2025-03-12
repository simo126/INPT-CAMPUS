package com.inptcampus.backend.Controller;

import com.inptcampus.backend.Model.Student;
import com.inptcampus.backend.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public Student reserveRoom(@RequestParam Long studentId,
                               @RequestParam String roomId) {
        return reservationService.reserveRoom(studentId, roomId);
    }
}
