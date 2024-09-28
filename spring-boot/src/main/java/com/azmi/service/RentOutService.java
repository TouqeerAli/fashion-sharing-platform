package com.azmi.service;

import com.azmi.modal.RentOut;
import com.azmi.modal.User;
import com.azmi.request.CreateRentOutRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface RentOutService {

    RentOut createRentOut(CreateRentOutRequest rentOutRequest, List<MultipartFile> images, Long userId) throws IOException;
    List<RentOut> getRentOutsByUserId(Long userId);

    RentOut updateRentOutStatus(Long id, String status);

    List<RentOut> getAllRentOutRequests();

    Page<RentOut> getAllRentOutRequestsWithPage(int page, int size);


    public Page<RentOut> findByStatusAndSort(String status, Pageable pageable);


    RentOut getRentOutProduct(Long id);
    RentOut createRentOut(CreateRentOutRequest rentOutRequest, List<MultipartFile> images) throws IOException;

}
