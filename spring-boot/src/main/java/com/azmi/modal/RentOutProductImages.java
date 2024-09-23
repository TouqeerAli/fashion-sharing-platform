package com.azmi.modal;
import com.azmi.modal.RentOut;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class RentOutProductImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imagePath;

    // Change the JoinColumn name to avoid conflict with the RentOut ID
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rent_out_id")  // This should map to RentOut's 'id' field
    private RentOut rentOut;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public RentOut getRentOut() {
        return rentOut;
    }

    public void setRentOut(RentOut rentOut) {
        this.rentOut = rentOut;
    }
}
