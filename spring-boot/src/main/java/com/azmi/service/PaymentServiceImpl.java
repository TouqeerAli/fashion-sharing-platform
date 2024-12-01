package com.azmi.service;

import com.azmi.modal.Order;
import com.azmi.repository.OrderRepository;
import com.azmi.response.PaymentResponse;
import com.azmi.user.domain.OrderStatus;
import com.azmi.user.domain.PaymentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import com.stripe. Stripe;
import com.stripe.exception. StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Value;
import com.stripe.param.checkout. SessionCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    private OrderRepository orderRepository;

    @Value("${stripe.api.key}")
    String stripeSecreteKey;
    @Override
    public PaymentResponse createPaymentLink(Order order) throws StripeException {

        Stripe.apiKey=stripeSecreteKey;
        SessionCreateParams params =SessionCreateParams.builder().addPaymentMethodType(
                        SessionCreateParams.PaymentMethodType.CARD)
                .setMode (SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/payment/success"+order.getId())
                .setCancelUrl("http://localhost:3000/payment/fail")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L).setPriceData(SessionCreateParams.LineItem. PriceData.builder()
                                .setCurrency("pkr")
                                .setUnitAmount ((long) order.getTotalDiscountedPrice()*100)
                                .setProductData (SessionCreateParams.LineItem. PriceData.ProductData.builder()
                                        .setName("Fashion Fix")
                                        .build())
                                .build()
                        )
                        .build()
                )
                .build();

        Session session = Session.create(params);
        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(session.getUrl());


        return res;
    }
}
