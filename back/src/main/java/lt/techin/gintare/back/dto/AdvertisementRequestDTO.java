package lt.techin.gintare.back.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AdvertisementRequestDTO {
    private String title;
    private String description;
    private BigDecimal price;
    private String city;
}
