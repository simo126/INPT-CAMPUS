package com.inptcampus.backend.Controller;

import com.inptcampus.backend.DTO.ReservationDTO;
import com.inptcampus.backend.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<String> createReservation(@RequestBody ReservationDTO reservationDTO) {
        String response = reservationService.createReservation(reservationDTO);
        return ResponseEntity.ok(response);
    }
}
