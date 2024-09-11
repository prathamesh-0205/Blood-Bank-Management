package com.app.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entity.Requesting;

public interface RequestingBloodRepository extends JpaRepository<Requesting, Integer> {

	public List<Requesting> findByEmail(String email);

	@Query("SELECT SUM(r.units) FROM Requesting r WHERE r.email = :email AND LOWER(r.status) = LOWER(:status)")
	Integer sumUnitsByEmailAndStatusIgnoreCase(@Param("email") String email, @Param("status") String status);

	@Transactional
	@Modifying
	@Query(value = "update requesting set status = 'accept' where email = ?1 and id=?2", nativeQuery = true)
	public void updateStatus(String email, int id);

	@Transactional
	@Modifying
	@Query(value = "update requesting set status = 'reject' where email = ?1 and id=?2", nativeQuery = true)
	public void rejectStatus(String email, int id);
	
	@Query("SELECT COALESCE(SUM(d.units), 0) FROM Donor d WHERE d.bloodGroup = :bloodGroup")
	int getAvailableUnitsByBloodGroup(@Param("bloodGroup") String bloodGroup);
}