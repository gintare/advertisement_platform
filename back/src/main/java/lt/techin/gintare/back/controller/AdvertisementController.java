package lt.techin.gintare.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.AdvertisementRequestDTO;
import lt.techin.gintare.back.dto.AdvertisementResponseDTO;
import lt.techin.gintare.back.repository.AdvertisementRepository;
import lt.techin.gintare.back.service.AdvertisementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class AdvertisementController {

    private final AdvertisementService advertisementService;

    @PostMapping("/api/categories/{categoryId}/advertisements")
    public AdvertisementResponseDTO postAdvertisement(@PathVariable Long categoryId, @RequestBody AdvertisementRequestDTO advertisementRequestDTO){
        return advertisementService.createAdvertisement(categoryId, advertisementRequestDTO);
    };

    @GetMapping("api/advertisements")
    public List<AdvertisementResponseDTO> getAdvertisements() {
        return advertisementService.getAllAdvertisements();
    }

    @GetMapping("api/categories/{categoryId}/advertisements")
    public List<AdvertisementResponseDTO> getAdvertisementsByCategory(@PathVariable Long categoryId) {
        return advertisementService.getAdvertisementsByCategory(categoryId);
    }

    @PutMapping("/api/categories/{categoryId}/advertisements/{id}")
    public AdvertisementResponseDTO editAdvertisement(@PathVariable Long categoryId, @PathVariable Long id, @RequestBody AdvertisementRequestDTO advertisementRequestDTO) {
        return advertisementService.updateAdvertisement(categoryId, id, advertisementRequestDTO);
    }

    @DeleteMapping("/api/advertisements/{id}")
    public AdvertisementResponseDTO deleteAdvertisement(@PathVariable Long id){
        return advertisementService.deleteAdvertisement(id);
    }
}
