package com.blog.payment.payments;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.razorpay.Payment;

import java.util.Map;

import org.json.JSONObject;

@Getter
@Setter
public class RazorpayPaymentResponse extends Payment {
    
    public RazorpayPaymentResponse(JSONObject jsonObject) {
        super(jsonObject);
    }
    private String id;
    private String entity;
    private int amount;
    private String currency;
    private String status;
    
    @JsonProperty("order_id")
    private String orderId;
    
    @JsonProperty("invoice_id")
    private String invoiceId;
    
    private boolean international;
    private String method;
    
    @JsonProperty("amount_refunded")
    private int amountRefunded;
    
    @JsonProperty("refund_status")
    private String refundStatus;
    
    private boolean captured;
    private String description;
    
    @JsonProperty("card_id")
    private String cardId;
    
    private String bank;
    private String wallet;
    private String vpa;
    private String email;
    private String contact;
    
    private Map<String, String> notes;
    private int fee;
    private int tax;
    
    @JsonProperty("error_code")
    private String errorCode;
    
    @JsonProperty("error_description")
    private String errorDescription;
    
    @JsonProperty("error_source")
    private String errorSource;
    
    @JsonProperty("error_step")
    private String errorStep;
    
    @JsonProperty("error_reason")
    private String errorReason;
    
    @JsonProperty("acquirer_data")
    private AcquirerData acquirerData;
    
    @JsonProperty("created_at")
    private long createdAt;
    
    private UpiData upi;

    @Getter
    @Setter
    public static class AcquirerData {
        private String rrn;
        
        @JsonProperty("upi_transaction_id")
        private String upiTransactionId;

    }
    @Getter
    @Setter
    public static class UpiData {
        private String vpa;

    }
}
