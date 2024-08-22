package lt.techin.gintare.back.service;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.CategoryRequestDTO;
import lt.techin.gintare.back.dto.CategoryResponseDTO;
import lt.techin.gintare.back.exceptions.CategoryNotFoundException;
import lt.techin.gintare.back.model.Category;
import lt.techin.gintare.back.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO) {
        Category category = new Category();
        category.setTitle(categoryRequestDTO.getTitle());
        categoryRepository.save(category);

        return getCategoryResponseDTO(category);
    }

    public List<CategoryResponseDTO> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponseDTO> categoryResponseDTOS = new ArrayList<>();
        for(Category category : categories) {
            categoryResponseDTOS.add(getCategoryResponseDTO(category));
        }
        return categoryResponseDTOS;
    }

    private CategoryResponseDTO getCategoryResponseDTO(Category category) {
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        categoryResponseDTO.setId(category.getId());
        categoryResponseDTO.setTitle(category.getTitle());
        return categoryResponseDTO;
    }

    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO categoryRequestDTO) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("No category found with an id = "+id));
        category.setTitle(categoryRequestDTO.getTitle());
        categoryRepository.save(category);

        return getCategoryResponseDTO(category);
    }

    public CategoryResponseDTO deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("No category found with an id = "+id));
        categoryRepository.delete(category);
        return getCategoryResponseDTO(category);
    }
}
