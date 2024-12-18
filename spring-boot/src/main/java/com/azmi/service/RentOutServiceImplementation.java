package com.azmi.service;

import com.azmi.modal.*;
import com.azmi.repository.*;
import com.azmi.request.CreateRentOutRequest;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Service
public class RentOutServiceImplementation implements RentOutService{

    private static final String IMAGE_UPLOAD_DIR = "src/main/resources/static/img/rent-out_products_img";

    @Autowired
    ProductRepository productRepo;



    @Autowired
    private JavaMailSender mailSender;  // Email sender instance


    ModelMapper modelMapper;


    private RentOutRepository rentOutRepository;
    private RentOutSizeRepository rentOutSizeRepository;
    private RentOutProductImagesRepository rentOutProductImagesRepository;
    
    private CategoryRepository categoryRepository;

    private final UserRepository userRepository;

    public RentOutServiceImplementation(RentOutSizeRepository rentOutSizeRepository,CategoryRepository categoryRepository, RentOutRepository rentOutRepository,
                                        ModelMapper modelMapper, RentOutProductImagesRepository rentOutProductImagesRepository,
                                        UserRepository userRepository) {
        this.rentOutRepository = rentOutRepository;
        this.modelMapper = modelMapper;
        this.rentOutProductImagesRepository = rentOutProductImagesRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.rentOutSizeRepository=rentOutSizeRepository;
    }

    @Override
    public RentOut createRentOut(CreateRentOutRequest rentOutRequest, List<MultipartFile> images, Long userId) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isRegistered()) {
            throw new RuntimeException("Only registered users can create rent outs");
        }
        System.out.println("Haa hitty");
        System.out.println("Test print"+rentOutRequest.getTopLevelCategory());
        Category topLevel=categoryRepository.findByName(rentOutRequest.getTopLevelCategory());
        System.out.println("he t hali wayo");
        if(topLevel==null) {

            Category topLevelCategory=new Category();
            topLevelCategory.setName(rentOutRequest.getTopLevelCategory());
            topLevelCategory.setLevel(1);

            topLevel= categoryRepository.save(topLevelCategory);
        }

        Category secondLevel=categoryRepository.
                findByNameAndParent(rentOutRequest.getSecondLevelCategory(),topLevel.getName());
        if(secondLevel==null) {

            Category secondLevelCategory=new Category();
            secondLevelCategory.setName(rentOutRequest.getSecondLevelCategory());
            secondLevelCategory.setParentCategory(topLevel);
            secondLevelCategory.setLevel(2);

            secondLevel= categoryRepository.save(secondLevelCategory);
        }

        Category thirdLevel=categoryRepository.findByNameAndParent(rentOutRequest.getThirdLevelCategory(),secondLevel.getName());
        if(thirdLevel==null) {

            Category thirdLevelCategory=new Category();
            thirdLevelCategory.setName(rentOutRequest.getThirdLevelCategory());
            thirdLevelCategory.setParentCategory(secondLevel);
            thirdLevelCategory.setLevel(3);

            thirdLevel=categoryRepository.save(thirdLevelCategory);
        }
        // Create RentOutSize with just the size name
        RentOutSize rentOutSize = new RentOutSize();
        rentOutSize.setName(rentOutRequest.getSize()); // Only set the name for now
        rentOutSize = rentOutSizeRepository.save(rentOutSize); // S
        //RentOut rentOut = rentOutRequestToRentOut(rentOutRequest);
        RentOut rentOut =new RentOut();
        rentOut.setItemName(rentOutRequest.getItemName());
        rentOut.setBrand(rentOutRequest.getBrand());
        rentOut.setSize(rentOutRequest.getSize());
        rentOut.setColor(rentOutRequest.getColor());
        rentOut.setDescription(rentOutRequest.getDescription());
        rentOut.setRentalPrice(rentOutRequest.getRentalPrice());
        rentOut.setPurchasePrice(rentOutRequest.getPurchasePrice());
        rentOut.setAvailableFrom(rentOutRequest.getAvailableFrom());
        rentOut.setAvailableTo(rentOutRequest.getAvailableTo());
        rentOut.setPickupLocation(rentOutRequest.getPickupLocation());
        rentOut.setTermsAndConditions(rentOutRequest.getTermsAndConditions());
        rentOut.setStatus("Pending");
        rentOut.setAvailableToSell(rentOutRequest.getAvailableToSell());
        rentOut.setCategory(thirdLevel);
        rentOut.setOccasion(rentOutRequest.getOccasion());
        rentOut.setRentOutSize(rentOutSize);
        rentOut.setUser(user);


        if (images != null && !images.isEmpty()) {
            List<RentOutProductImages> rentOutProductImages = saveImages(images, rentOut);
            rentOut.setImages(rentOutProductImages);
            rentOutRepository.save(rentOut);
            rentOutProductImagesRepository.saveAll(rentOutProductImages); // Save image entities
        }
        return rentOut;
    }

    @Override
    public Page<RentOut> getRentOutsByUserId(Long userId, String status, Pageable pageable) {
        if (status != null && !status.isEmpty()) {
            return rentOutRepository.findByUserIdAndStatus(userId,status,pageable);
        } else {
            return rentOutRepository.findByUserId(userId,pageable);
        }

    }
    private List<RentOutProductImages> saveImages(List<MultipartFile> images, RentOut rentOut) throws IOException {

        Path uploadPath = Paths.get(IMAGE_UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            System.out.println("Creating directory: " + uploadPath.toString());
            Files.createDirectories(uploadPath);
        } else {
            System.out.println("Directory already exists: " + uploadPath.toString());
        }

        List<RentOutProductImages> rentOutProductImagesList = new ArrayList<>();

        if (images == null || images.isEmpty()) {
            System.out.println("No images to upload");
            return rentOutProductImagesList;
        }

        for (MultipartFile file : images) {
            try {
                // Generate unique filename
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                System.out.println("filepath: "+filePath.toString());
                // Save the image
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("Saved file: " + fileName);

                // Create RentOutProductImages entity
                RentOutProductImages rentOutProductImage = new RentOutProductImages();
                rentOutProductImage.setImagePath(fileName); // Save the image filename/path
                rentOutProductImage.setRentOut(rentOut); // Set the RentOut reference
                rentOutProductImagesList.add(rentOutProductImage);
            } catch (IOException e) {
                System.err.println("Error saving file: " + file.getOriginalFilename());
                e.printStackTrace();
            }
        }

        return rentOutProductImagesList;
    }


    // Fetch all rent-out requests
    public List<RentOut> getAllRentOutRequests() {
        return rentOutRepository.findAll();
    }

    public Page<RentOut> getAllRentOutRequestsWithPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return rentOutRepository.findAll(pageable);
    }




    public Page<RentOut> findByStatusAndSort(String status, Pageable pageable){

        if (status != null && !status.isEmpty()) {
            return rentOutRepository.findByStatus(status,pageable);
        } else {
            return rentOutRepository.findAll(pageable);
        }

    }



    // Update status
    public RentOut updateRentOutStatus(Long id, String status) {
        RentOut rentOut = rentOutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RentOut request not found"));

        String email = rentOut.getUser().getEmail();

        sendEmail(email);

        rentOut.setStatus(status);


        //After approving the rentout, add it to product table to show in the frontend
        Product product = new Product();
        product.setItemName(rentOut.getItemName());
        product.setBrand(rentOut.getBrand());
        product.setSize(rentOut.getSize());
        product.setColor(rentOut.getColor());
        product.setDescription(rentOut.getDescription());
        product.setRentalPrice(rentOut.getRentalPrice());
        product.setPurchasePrice(rentOut.getPurchasePrice());
        product.setAvailableFrom(rentOut.getAvailableFrom());
        product.setAvailableTo(rentOut.getAvailableTo());
        product.setCreatedDate(rentOut.getCreatedDate());
        product.setPickupLocation(rentOut.getPickupLocation());
        product.setTermsAndConditions(rentOut.getTermsAndConditions());
        product.setStatus(rentOut.getStatus());
        product.setCategory(rentOut.getCategory());
        product.setUser(rentOut.getUser());

        List<RentOutProductImages> productImages = this.rentOutProductImagesRepository.findByRentOutId(rentOut.getId());
        for(RentOutProductImages image : productImages){
            image.setProduct(product);
        }

        System.out.println("Before Product is saved");
        this.productRepo.save(product);
        System.out.println("Product is saved");
        return rentOutRepository.save(rentOut);
    }

    private void sendEmail(String email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("RentOut Status Update");
            message.setText("Your RentOut request status has been updated to: ");

            // Send the email
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email".concat(e.getMessage()), e);
        }
    }


    @Override
    public RentOut getRentOutProduct(Long id) {
        return rentOutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RentOut request not found"));
    }

    @Override
    public RentOut updateRentOutSize(Long id, RentOutSize rentOutSizeReq) {
        RentOut rentOut = rentOutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RentOut not found"));

        // Fetch the RentOutSize entity associated with this RentOut
        RentOutSize rentOutSize = rentOut.getRentOutSize();
        if (rentOutSize == null) {
            throw new RuntimeException("RentOutSize not found for this product");
        }
        rentOutSize.setShoulder(rentOutSizeReq.getShoulder());
        rentOutSize.setChest(rentOutSizeReq.getChest());
        rentOutSize.setWaist(rentOutSizeReq.getWaist());
        rentOutSize.setTopLength(rentOutSizeReq.getTopLength());
        rentOutSize.setHip(rentOutSizeReq.getHip());
        rentOutSize.setSleeves(rentOutSizeReq.getSleeves());
        rentOutSize.setArmHole(rentOutSizeReq.getArmHole());
        rentOutSize.setBottomLength(rentOutSizeReq.getBottomLength());
        rentOutSize.setBottomWaist(rentOutSizeReq.getBottomWaist());
        rentOutSize.setInnerLength(rentOutSizeReq.getInnerLength());

        // Save the updated RentOutSize entity
        RentOutSize saved = rentOutSizeRepository.save(rentOutSize);
        rentOut.setRentOutSize(saved);
        return rentOutRepository.save(rentOut);
    }

    public RentOut rentOutRequestToRentOut(CreateRentOutRequest rentOutRequest) {
        // Create a TypeMap for RentOut and skip the category and thirdLevelCategory mappings
        TypeMap<CreateRentOutRequest, RentOut> typeMap = this.modelMapper.typeMap(CreateRentOutRequest.class, RentOut.class);

        // Skip the category and thirdLevelCategory setters
        typeMap.addMappings(mapper -> {
            mapper.skip(RentOut::setCategory);
        });

        // Map the request to RentOut object

        return typeMap.map(rentOutRequest);
    }






}
