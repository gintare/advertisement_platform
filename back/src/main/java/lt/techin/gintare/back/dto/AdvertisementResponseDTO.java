package lt.techin.gintare.back.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AdvertisementResponseDTO {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String city;
    private CategoryResponseDTO category;

}
