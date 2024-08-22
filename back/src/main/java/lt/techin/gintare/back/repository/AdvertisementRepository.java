package lt.techin.gintare.back.repository;

import lt.techin.gintare.back.model.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
}
