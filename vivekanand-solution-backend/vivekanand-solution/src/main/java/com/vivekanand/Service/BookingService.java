package com.vivekanand.Service;

import com.vivekanand.Entity.Booking;
import com.vivekanand.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Create

    public Booking createBooking(Booking booking) {
        // Any validation logic can go here (e.g., check email format, phone number, etc.)
        return bookingRepository.save(booking);
    }

    // Read All
    // Read All
    public List<Booking> getAllBookings() {
        return bookingRepository.findAllWithChildren();
    }


    // Read by Id
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // Update
    public Booking updateBooking(Long id, Booking updatedBooking) {
        return bookingRepository.findById(id).map(existingBooking -> {

            // Update parent-level details
            existingBooking.setContactNumber(updatedBooking.getContactNumber());
            existingBooking.setEmail(updatedBooking.getEmail());
            existingBooking.setTutorGender(updatedBooking.getTutorGender());
            existingBooking.setPreferredTime(updatedBooking.getPreferredTime());
            existingBooking.setPreferredTimingByParent(updatedBooking.getPreferredTimingByParent());
            existingBooking.setFrequency(updatedBooking.getFrequency());
            existingBooking.setLocation(updatedBooking.getLocation());

            // Update children
            existingBooking.getChildren().clear(); // remove old children
            if (updatedBooking.getChildren() != null) {
                updatedBooking.getChildren().forEach(child -> {
                    child.setBooking(existingBooking); // re-link to parent
                    existingBooking.getChildren().add(child);
                });
            }

            return bookingRepository.save(existingBooking);
        }).orElseThrow(() -> new RuntimeException("Booking not found with id " + id));
    }


    // Delete
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Booking not found with id " + id);
        }
        bookingRepository.deleteById(id);
    }
}
