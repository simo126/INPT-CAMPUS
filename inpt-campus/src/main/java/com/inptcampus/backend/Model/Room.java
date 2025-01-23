package com.inptcampus.backend.Model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "rooms", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"roomNumber", "building_id"})
})
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roomNumber;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @Column(nullable = false)
    private int floor;

    @Column(nullable = false)
    private String roomType;

    @Column(nullable = false)
    private int maxCapacity;

    @Column(nullable = false)
    private int currentOccupancy;
}