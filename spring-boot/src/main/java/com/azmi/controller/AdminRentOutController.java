package com.azmi.controller;

import com.azmi.modal.RentOut;
import com.azmi.service.RentOutService;
import org.springframework.data.domain.Page;
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
    public Page<RentOut> getAllRentOutRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        System.out.println("Hello rent"+page+size);
        Page<RentOut> result = rentOutService.getAllRentOutRequestsWithPage(page, size);
        List<RentOut> list = result.getContent();
        System.out.println("List"+list);
        for(RentOut rent : list){
            System.out.println("Name: "+rent.getName());
        }

        return rentOutService.getAllRentOutRequestsWithPage(page, size);
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
