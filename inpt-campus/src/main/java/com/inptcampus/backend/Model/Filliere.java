package com.inptcampus.backend.Model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "fillieres")
public class Filliere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}