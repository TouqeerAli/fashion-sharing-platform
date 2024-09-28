package com.azmi.service;

import com.azmi.modal.Category;
import com.azmi.modal.RentOut;
import com.azmi.modal.RentOutProductImages;
import com.azmi.repository.CategoryRepository;
import com.azmi.repository.RentOutProductImagesRepository;
import com.azmi.repository.RentOutRepository;
import com.azmi.request.CreateRentOutRequest;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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


    ModelMapper modelMapper;


    private RentOutRepository rentOutRepository;
    private RentOutProductImagesRepository rentOutProductImagesRepository;
    
    private CategoryRepository categoryRepository;

    public RentOutServiceImplementation(CategoryRepository categoryRepository,RentOutRepository rentOutRepository,ModelMapper modelMapper,RentOutProductImagesRepository rentOutProductImagesRepository) {
        this.rentOutRepository = rentOutRepository;
        this.modelMapper=modelMapper;
        this.rentOutProductImagesRepository=rentOutProductImagesRepository;
        this.categoryRepository=categoryRepository;
    }

    @Override
    public RentOut createRentOut(CreateRentOutRequest rentOutRequest, List<MultipartFile> images) throws IOException {
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
        rentOut.setName(rentOutRequest.getName());
        rentOut.setEmail(rentOutRequest.getEmail());
        rentOut.setContact(rentOutRequest.getContact());
        rentOut.setPickupLocation(rentOutRequest.getPickupLocation());
        rentOut.setTermsAndConditions(rentOutRequest.getTermsAndConditions());
        rentOut.setCategory(thirdLevel);

        if (images != null && !images.isEmpty()) {
            List<RentOutProductImages> rentOutProductImages = saveImages(images, rentOut);
            rentOut.setImages(rentOutProductImages);
            rentOutRepository.save(rentOut);
            rentOutProductImagesRepository.saveAll(rentOutProductImages); // Save image entities
        }
        return rentOut;
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



    // Update status
    public RentOut updateRentOutStatus(Long id, String status) {
        RentOut rentOut = rentOutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RentOut request not found"));
        rentOut.setStatus(status);
        return rentOutRepository.save(rentOut);
    }

    @Override
    public RentOut getRentOutProduct(Long id) {
        return rentOutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RentOut request not found"));
    }

    public RentOut rentOutRequestToRentOut(CreateRentOutRequest rentOutRequest) {
        // Create a TypeMap for RentOut and skip the category and thirdLevelCategory mappings
        TypeMap<CreateRentOutRequest, RentOut> typeMap = modelMapper.typeMap(CreateRentOutRequest.class, RentOut.class);

        // Skip the category and thirdLevelCategory setters
        typeMap.addMappings(mapper -> {
            mapper.skip(RentOut::setCategory);
        });

        // Map the request to RentOut object

        return typeMap.map(rentOutRequest);
    }






}
