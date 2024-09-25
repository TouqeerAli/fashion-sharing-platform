package com.azmi.controller;

import com.azmi.modal.RentOut;
import com.azmi.request.CreateRentOutRequest;
import com.azmi.service.RentOutService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/rentout")
public class UserRentOutController {

    private RentOutService rentOutService;

    public UserRentOutController(RentOutService rentOutService) {
        this.rentOutService = rentOutService;
    }

    @PostMapping(path ="/"/*, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }*/)
    public ResponseEntity<RentOut> createRentOut(@ModelAttribute CreateRentOutRequest rentOutRequest, @RequestParam("images") List<MultipartFile> images) throws IOException {

        System.out.println("Jello");
        System.out.println(rentOutRequest.getTopLevelCategory());
        System.out.println(rentOutRequest.getSecondLevelCategory());
        System.out.println(rentOutRequest.getThirdLevelCategory());
        System.out.println(images.get(0).getOriginalFilename());
        RentOut rentOut = rentOutService.createRentOut(rentOutRequest,images);
        return new ResponseEntity<>(rentOut, HttpStatus.CREATED);
    }
}
