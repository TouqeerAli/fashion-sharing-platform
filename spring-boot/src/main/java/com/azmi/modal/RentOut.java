package com.azmi.modal;

import jakarta.persistence.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
public class RentOut {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private String brand;
   // private String category;
    private String size;
    private String color;
    private String description;
    //private String condition;

    private Double rentalPrice;
    private Double purchasePrice;

    private LocalDate availableFrom;
    private LocalDate availableTo;

//    private String name;
//    private String email;
//    private String contact;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;


    @PrePersist
    protected void onCreate() {
        createdDate = new Date();  // Set to the current system date when the entity is first saved
    }

    /* @Lob*/
    // List of image paths (for multiple images)
    @OneToMany(mappedBy = "rentOut", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RentOutProductImages> images; // Storing images in a separate table
    private String pickupLocation;
    //private Boolean deliveryOptions;
    //private Double securityDeposit;

    private Boolean termsAndConditions;

    @ManyToOne()
    @JoinColumn(name="category_id")
    private Category category;

    private String status;  // Can be "pending", "approved", or "rejected"

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRentalPrice() {
        return rentalPrice;
    }

    public void setRentalPrice(Double rentalPrice) {
        this.rentalPrice = rentalPrice;
    }

    public Double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public LocalDate getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(LocalDate availableFrom) {
        this.availableFrom = availableFrom;
    }

    public LocalDate getAvailableTo() {
        return availableTo;
    }

    public void setAvailableTo(LocalDate availableTo) {
        this.availableTo = availableTo;
    }

//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getContact() {
//        return contact;
//    }
//
//    public void setContact(String contact) {
//        this.contact = contact;
//    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public Boolean getTermsAndConditions() {
        return termsAndConditions;
    }

    public void setTermsAndConditions(Boolean termsAndConditions) {
        this.termsAndConditions = termsAndConditions;
    }

    public RentOut() {
    }

    public List<RentOutProductImages> getImages() {
        return images;
    }

    public void setImages(List<RentOutProductImages> images) {
        this.images = images;
    }

    public RentOut(Long id, String itemName, String brand, Category category, String size, String color, String description, Double rentalPrice, Double purchasePrice, LocalDate availableFrom, LocalDate availableTo,String pickupLocation, Boolean termsAndConditions) {
        this.id = id;
        this.itemName = itemName;
        this.brand = brand;
        this.category = category;
        this.size = size;
        this.color = color;
        this.description = description;
        this.rentalPrice = rentalPrice;
        this.purchasePrice = purchasePrice;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
//        this.name = name;
//        this.email = email;
//        this.contact = contact;
        this.pickupLocation = pickupLocation;
        this.termsAndConditions = termsAndConditions;
    }
}
