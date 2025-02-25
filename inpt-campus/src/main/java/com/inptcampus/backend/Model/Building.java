package com.inptcampus.backend.Model;


import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "buildings")
public class Building implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "num_floors", nullable = false)
    private int numFloors;

    public Building() {
    }

    public Building(int numFloors) {
        this.numFloors = numFloors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumFloors() {
        return numFloors;
    }

    public void setNumFloors(int numFloors) {
        this.numFloors = numFloors;
    }
}
