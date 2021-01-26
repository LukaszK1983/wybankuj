package pl.wybankuj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.wybankuj.entity.Agency;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgencyRepository extends CrudRepository<Agency, Long> {

    List<Agency> findAllByBankId(Long bankId);

    List<Agency> findAllByBankIdAndCity(Long bankId, String city);
}
