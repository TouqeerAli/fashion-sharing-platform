package com.azmi.controller;

import com.azmi.modal.RentOut;
import com.azmi.service.RentOutService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
    @RequestMapping("/api/admin/rentout")
public class AdminRentOutController {

    private RentOutService rentOutService;

    public AdminRentOutController(RentOutService rentOutService) {
        this.rentOutService = rentOutService;
    }



    // Fetch all rent-out requests
    @GetMapping("/all")
    public ResponseEntity<List<RentOut>> getAllRentOutProducts() {
        List<RentOut> allRentOutRequests = rentOutService.getAllRentOutRequests();
        return new ResponseEntity<>(allRentOutRequests, HttpStatus.OK);
    }

    @GetMapping("/rentOutRequests")
    public ResponseEntity<Page<RentOut>> getAllRentOutRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "DESC") String sortOrder) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortOrder.equalsIgnoreCase("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC, "createdDate"));

        Page<RentOut> requests = rentOutService.findByStatusAndSort(status, pageable);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentOut> getRentOutProduct(@PathVariable Long id) {

        RentOut rentOutProduct = rentOutService.getRentOutProduct(id);
        return new ResponseEntity<>(rentOutProduct, HttpStatus.OK);
    }

    // Update status (approve/reject)
    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<RentOut> updateRentOutStatus(@PathVariable Long id, @RequestParam String status) {
        RentOut updatedRentOut = rentOutService.updateRentOutStatus(id, status);
        return ResponseEntity.ok(updatedRentOut);
    }

}

