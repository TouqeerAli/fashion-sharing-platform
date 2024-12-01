package com.azmi.modal;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.*;

import jakarta.persistence.*;

@Entity
public class Product {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;


	private String itemName;
	private String size;

	private Double rentalPrice;
	private Double purchasePrice;

	private LocalDate availableFrom;
	private LocalDate availableTo;


	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdDate;


	/* @Lob*/
	// List of image paths (for multiple images)
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<RentOutProductImages> images;// Storing images in a separate table

	private String pickupLocation;

	private Boolean termsAndConditions;

	private String status;


    @Column(name = "price")
    private int price;

    @Column(name = "discounted_price")
    private int discountedPrice;
    
    @Column(name="discount_persent")
    private int discountPersent;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "brand")
    private String brand;

    @Column(name = "color")
    private String color;

    @Embedded
    @ElementCollection
    @Column(name = "sizes")
    private Set<Size> sizes=new HashSet<>();

    @Column(name = "image_url")
    private String imageUrl;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Rating>ratings=new ArrayList<>();
    
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Review>reviews=new ArrayList<>();

    @Column(name = "num_ratings")
    private int numRatings;
    

    @ManyToOne()
    @JoinColumn(name="category_id")
    private Category category;
    
    private LocalDateTime createdAt;

	@Column(name = "occasion")
	private String occasion;

	// One-to-One relationship with RentOutSize
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "rent_out_size_id", referencedColumnName = "id")
	private RentOutSize rentOutSize;

	public String getOccasion() {
		return occasion;
	}

	public void setOccasion(String occasion) {
		this.occasion = occasion;
	}

	public Product() {
		
	}


	public RentOutSize getRentOutSize() {
		return rentOutSize;
	}

	public void setRentOutSize(RentOutSize rentOutSize) {
		this.rentOutSize = rentOutSize;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public List<RentOutProductImages> getImages() {
		return images;
	}

	public void setImages(List<RentOutProductImages> images) {
		this.images = images;
	}

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Product(Long id, String title, String description, int price, int discountedPrice, int discountPersent,
				   int quantity, String brand, String color, Set<Size> sizes, String imageUrl, List<Rating> ratings,
				   List<Review> reviews, int numRatings, Category category, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.price = price;
		this.discountedPrice = discountedPrice;
		this.discountPersent = discountPersent;
		this.quantity = quantity;
		this.brand = brand;
		this.color = color;
		this.sizes = sizes;
		this.imageUrl = imageUrl;
		this.ratings = ratings;
		this.reviews = reviews;
		this.numRatings = numRatings;
		this.category = category;
		this.createdAt = createdAt;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public List<Rating> getRatings() {
		return ratings;
	}

	public void setRatings(List<Rating> ratings) {
		this.ratings = ratings;
	}

	public List<Review> getReviews() {
		return reviews;
	}

	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getDiscountedPrice() {
		return discountedPrice;
	}

	public void setDiscountedPrice(int discountedPrice) {
		this.discountedPrice = discountedPrice;
	}

	public int getDiscountPersent() {
		return discountPersent;
	}

	public void setDiscountPersent(int discountPersent) {
		this.discountPersent = discountPersent;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public int getNumRatings() {
		return numRatings;
	}

	public void setNumRatings(int numRatings) {
		this.numRatings = numRatings;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Set<Size> getSizes() {
		return sizes;
	}

	public void setSizes(Set<Size> sizes) {
		this.sizes = sizes;
	}

	@Override
	public int hashCode() {
		return Objects.hash(brand, category, color, description, discountPersent, discountedPrice, id, imageUrl,
				numRatings, price, quantity, ratings, reviews, sizes, title);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		return Objects.equals(brand, other.brand) && Objects.equals(category, other.category)
				&& Objects.equals(color, other.color) && Objects.equals(description, other.description)
				&& discountPersent == other.discountPersent && discountedPrice == other.discountedPrice
				&& Objects.equals(id, other.id) && Objects.equals(imageUrl, other.imageUrl)
				&& numRatings == other.numRatings && price == other.price && quantity == other.quantity
				&& Objects.equals(ratings, other.ratings) && Objects.equals(reviews, other.reviews)
				&& Objects.equals(sizes, other.sizes) && Objects.equals(title, other.title);
	}

	

   
}
