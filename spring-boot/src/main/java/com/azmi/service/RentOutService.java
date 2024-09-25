package com.azmi.service;

import com.azmi.modal.RentOut;
import com.azmi.request.CreateRentOutRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface RentOutService {

    RentOut updateRentOutStatus(Long id, String status);

    List<RentOut> getAllRentOutRequests();
    RentOut getRentOutProduct(Long id);
    RentOut createRentOut(CreateRentOutRequest rentOutRequest, List<MultipartFile> images) throws IOException;
}
