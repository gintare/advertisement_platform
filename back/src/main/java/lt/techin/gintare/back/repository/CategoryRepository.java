package lt.techin.gintare.back.repository;

import lt.techin.gintare.back.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
