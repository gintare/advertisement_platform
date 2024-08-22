package lt.techin.gintare.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.CategoryRequestDTO;
import lt.techin.gintare.back.dto.CategoryResponseDTO;
import lt.techin.gintare.back.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/api/categories")
    public CategoryResponseDTO createCategory(@RequestBody CategoryRequestDTO categoryRequestDTO){
           return categoryService.createCategory(categoryRequestDTO);
    }

    @GetMapping("/api/categories")
    public List<CategoryResponseDTO> getCategories(){
        return categoryService.getCategories();
    }

    @PutMapping("/api/categories/{id}")
    public CategoryResponseDTO updateCategory(@PathVariable Long id, @RequestBody CategoryRequestDTO categoryRequestDTO) {
        return categoryService.updateCategory(id, categoryRequestDTO);
    }

    @DeleteMapping("/api/categories/{id}")
    public CategoryResponseDTO deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
}
