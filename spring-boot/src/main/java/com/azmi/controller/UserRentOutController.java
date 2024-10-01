package com.azmi.controller;

import com.azmi.modal.RentOut;
import com.azmi.modal.Role;
import com.azmi.modal.User;
import com.azmi.repository.RoleRepository;
import com.azmi.repository.UserRepository;
import com.azmi.request.CreateRentOutRequest;
import com.azmi.service.CustomUserDetails;
import com.azmi.service.CustomUserDetailsService;
import com.azmi.service.RentOutService;
import com.azmi.user.domain.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/rentout")
public class UserRentOutController {

    private RentOutService rentOutService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public UserRentOutController(RentOutService rentOutService) {
        this.rentOutService = rentOutService;
    }

    @PostMapping(path ="/"/*, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }*/)
    public ResponseEntity<RentOut> createRentOut(@ModelAttribute CreateRentOutRequest rentOutRequest,
                                                 @RequestParam("images") List<MultipartFile> images
                                                ) throws IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String  username = (String) authentication.getPrincipal();

            User user = userRepository.findByEmail(username);

            if(user == null) {
                throw new UsernameNotFoundException("user not found with email "+username);
            }

            Role renterRole = roleRepository.findByName(UserRole.ROLE_RENTER)
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            // Check if the user already has the "ROLE_RENTER" role
            if (!user.getRoles().contains(renterRole)) {
                // Add the "ROLE_RENTER" role to the user's roles
                user.getRoles().add(renterRole);
                userRepository.save(user);  // Save the updated user with the new role
            }
            RentOut rentOut = rentOutService.createRentOut(rentOutRequest, images, user.getId());

            return new ResponseEntity<>(rentOut, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/my-rentouts")
    public ResponseEntity<Page<RentOut>> getUserRentOuts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "DESC") String sortOrder
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String username = (String) authentication.getPrincipal();

            User user = userRepository.findByEmail(username);
            if (user == null) {
                throw new UsernameNotFoundException("User not found with email " + username);
            }

            Pageable pageable = PageRequest.of(page, size, Sort.by(sortOrder.equalsIgnoreCase("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC, "availableFrom"));

            // Fetch the list of products the user has rented out
            Page<RentOut> rentOuts = rentOutService.getRentOutsByUserId(user.getId(), status, pageable);

            return new ResponseEntity<>(rentOuts, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


    }
    @GetMapping("/{id}")
    public ResponseEntity<RentOut> getUserRentOut(@PathVariable Long id) {

        RentOut rentOutProduct = rentOutService.getRentOutProduct(id);
        return new ResponseEntity<>(rentOutProduct, HttpStatus.OK);
    }

}
