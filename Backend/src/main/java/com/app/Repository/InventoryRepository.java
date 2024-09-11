package com.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entity.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

	// Method to find inventory by blood group
	Inventory findByBloodGroup(String bloodGroup);

	@Query("SELECT COUNT(d) FROM Donor d WHERE LOWER(d.bloodGroup) = LOWER(:bloodGroup)")
	int countByBloodGroupIgnoreCase(@Param("bloodGroup") String bloodGroup);
}
