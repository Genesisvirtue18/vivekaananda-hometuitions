package com.vivekanand.Controller;


import com.vivekanand.DTO.BookingDTO;
import com.vivekanand.DTO.ChildDTO;
import com.vivekanand.Entity.Booking;
import com.vivekanand.Repository.BookingRepository;
import com.vivekanand.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    // Create
    /*@PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }*/

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        // Ensure children are linked to the booking
        booking.getChildren().forEach(child -> child.setBooking(booking));
        return bookingService.createBooking(booking);
    }


    // Read All
    @GetMapping
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAllWithChildren().stream()
                .map(this::mapToDTO)
                .toList();
    }


    private BookingDTO mapToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setContactNumber(booking.getContactNumber());
        dto.setEmail(booking.getEmail());
        dto.setLocation(booking.getLocation());
        dto.setPreferredTime(booking.getPreferredTime());
        dto.setPreferredTimingByParent(booking.getPreferredTimingByParent()); // added
        dto.setTutorGender(booking.getTutorGender());                          // added
        dto.setFrequency(booking.getFrequency());                              // added
        dto.setChildren(
                booking.getChildren().stream()
                        .map(child -> new ChildDTO(
                                child.getId(),
                                child.getChildName(),
                                child.getGrade(),
                                child.getBoard(),
                                child.getSubjects()   // ✅ pass subjects
                        ))
                        .toList()
        );

        return dto;
    }


    // Read by ID
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id " + id));
    }

    // Update
    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingService.updateBooking(id, updatedBooking);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return "Booking deleted successfully!";
    }
}
