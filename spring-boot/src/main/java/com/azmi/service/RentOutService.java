package com.azmi.service;

import com.azmi.modal.RentOut;
import com.azmi.request.CreateRentOutRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface RentOutService {

    RentOut updateRentOutStatus(Long id, String status);

    List<RentOut> getAllRentOutRequests();

    Page<RentOut> getAllRentOutRequestsWithPage(int page, int size);

    RentOut getRentOutProduct(Long id);
    RentOut createRentOut(CreateRentOutRequest rentOutRequest, List<MultipartFile> images) throws IOException;
}
