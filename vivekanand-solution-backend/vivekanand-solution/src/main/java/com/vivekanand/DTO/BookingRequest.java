package com.vivekanand.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {
    public String childName;
    public String contactNumber;
    public String email;
    public Long classPriceId;     // selected class id
    public String board;
    public String tutorGender;
    public String preferredTime;
    public String preferredSubject;
    public String frequency;
    public String location;
}
