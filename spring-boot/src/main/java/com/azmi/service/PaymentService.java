package com.azmi.service;

import com.azmi.modal.Order;
import com.azmi.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
