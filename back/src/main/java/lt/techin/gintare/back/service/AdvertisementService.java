package lt.techin.gintare.back.service;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.AdvertisementRequestDTO;
import lt.techin.gintare.back.dto.AdvertisementResponseDTO;
import lt.techin.gintare.back.dto.CategoryResponseDTO;
import lt.techin.gintare.back.exceptions.AdvertisementNotFoundException;
import lt.techin.gintare.back.exceptions.CategoryNotFoundException;
import lt.techin.gintare.back.model.Advertisement;
import lt.techin.gintare.back.model.Category;
import lt.techin.gintare.back.repository.AdvertisementRepository;
import lt.techin.gintare.back.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AdvertisementService {

    private final AdvertisementRepository advertisementRepository;
    private final CategoryRepository categoryRepository;

    public AdvertisementResponseDTO createAdvertisement(Long categoryId, AdvertisementRequestDTO advertisementRequestDTO) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found with an id = "+categoryId));
        Advertisement advertisement = new Advertisement();
        advertisement.setTitle(advertisementRequestDTO.getTitle());
        advertisement.setDescription(advertisementRequestDTO.getDescription());
        advertisement.setPrice(advertisementRequestDTO.getPrice());
        advertisement.setCity(advertisementRequestDTO.getCity());
        advertisement.setCategory(category);
        advertisementRepository.save(advertisement);

        return getAdvertisementResponseDTO(advertisement);
    }

    private AdvertisementResponseDTO getAdvertisementResponseDTO(Advertisement advertisement) {
        AdvertisementResponseDTO advertisementResponseDTO = new AdvertisementResponseDTO();
        advertisementResponseDTO.setId(advertisement.getId());
        advertisementResponseDTO.setTitle(advertisement.getTitle());
        advertisementResponseDTO.setDescription(advertisement.getDescription());
        advertisementResponseDTO.setPrice(advertisement.getPrice());
        advertisementResponseDTO.setCity(advertisement.getCity());
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        categoryResponseDTO.setId(advertisement.getCategory().getId());
        categoryResponseDTO.setTitle(advertisement.getCategory().getTitle());
        advertisementResponseDTO.setCategory(categoryResponseDTO);
        return advertisementResponseDTO;
    }

    public List<AdvertisementResponseDTO> getAllAdvertisements() {
        List<Advertisement> advertisements = advertisementRepository.findAll();
        List<AdvertisementResponseDTO> advertisementResponseDTOS = new ArrayList<>();
        for(Advertisement advertisement : advertisements){
            advertisementResponseDTOS.add(getAdvertisementResponseDTO(advertisement));
        }
        return advertisementResponseDTOS;
    }

    public AdvertisementResponseDTO updateAdvertisement(Long categoryId, Long id, AdvertisementRequestDTO advertisementRequestDTO) {
        Advertisement advertisement = advertisementRepository.findById(id).orElseThrow(() -> new AdvertisementNotFoundException("No advertisement found with an id = "+id));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found with an id = "+categoryId));
        advertisement.setTitle(advertisementRequestDTO.getTitle());
        advertisement.setDescription(advertisementRequestDTO.getDescription());
        advertisement.setPrice(advertisementRequestDTO.getPrice());
        advertisement.setCity(advertisementRequestDTO.getCity());
        advertisement.setCategory(category);
        advertisementRepository.save(advertisement);
        return getAdvertisementResponseDTO(advertisement);
    }

    public AdvertisementResponseDTO deleteAdvertisement(Long id) {
        Advertisement advertisement = advertisementRepository.findById(id).orElseThrow(() -> new AdvertisementNotFoundException("No advertisement found with an id = "+id));
        advertisementRepository.delete(advertisement);
        return getAdvertisementResponseDTO(advertisement);
    }

    public List<AdvertisementResponseDTO> getAdvertisementsByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found with an id = "+categoryId));
        // List<Advertisement>
        return null;
    }
}
