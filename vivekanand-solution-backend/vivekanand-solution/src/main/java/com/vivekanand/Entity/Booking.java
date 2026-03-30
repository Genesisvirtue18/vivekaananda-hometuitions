/*package com.vivekanand.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String childName;
    private String contactNumber;
    private String email;
    private String board;
    private String tutorGender;
    private String preferredTime;
    private String preferredTimingByParent;
    private String frequency;
    private String location;
    private String grade;

    @ElementCollection
    @CollectionTable(name = "booking_subjects", joinColumns = @JoinColumn(name = "booking_id"))
    @Column(name = "subject")
    private List<String> subjects = new ArrayList<>();
}*/

package com.vivekanand.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Parent details
    private String contactNumber;
    private String email;
    private String tutorGender;
    private String preferredTime;
    private String preferredTimingByParent;
    private String frequency;
    private String location;

    // One parent booking can have multiple children
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Child> children = new ArrayList<>();

    // helper method to link children properly
    public void addChild(Child child) {
        child.setBooking(this);
        this.children.add(child);
    }
}

