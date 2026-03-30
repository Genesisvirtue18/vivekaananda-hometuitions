package com.vivekanand.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookingDTO {
    private Long id;
    private String contactNumber;
    private String email;
    private String location;
    private String preferredTime;
    private String preferredTimingByParent; // add this
    private String tutorGender;              // add this
    private String frequency;                // add this
    private List<ChildDTO> children;
}
