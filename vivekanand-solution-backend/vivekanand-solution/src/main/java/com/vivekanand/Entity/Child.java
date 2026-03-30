package com.vivekanand.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "children")
@Getter
@Setter
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String childName;
    private String grade;
    private String board;

    @ElementCollection
    @CollectionTable(name = "child_subjects", joinColumns = @JoinColumn(name = "child_id"))
    @Column(name = "subject")
    private List<String> subjects = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
