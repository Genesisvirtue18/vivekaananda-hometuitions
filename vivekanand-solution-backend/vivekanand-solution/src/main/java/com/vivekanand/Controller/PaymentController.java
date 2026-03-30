package com.vivekanand.Controller;

import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    private RazorpayClient client;

    public PaymentController() throws Exception {
        this.client = new RazorpayClient("rzp_test_c62AsoWrgvuVIF", "pEHKmgZuHdPpGOISlZOFer99");
    }

    @PostMapping("/order")
    public String createOrder(@RequestBody PaymentRequest req) throws Exception {
        JSONObject options = new JSONObject();
        options.put("amount", req.getAmount() * 100); // Razorpay uses paise
        options.put("currency", req.getCurrency());
        options.put("payment_capture", 1);

        Order order = client.orders.create(options);
        return order.toString();
    }
}

class PaymentRequest {
    private int amount;
    private String currency;

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
}
