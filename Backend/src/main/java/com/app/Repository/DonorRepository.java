package com.app.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entity.Donor;

public interface DonorRepository extends JpaRepository<Donor, Integer> {
	@Query("select count(d) from Donor d where d.bloodGroup = ?1")
	public int countByBloodGroup(String bloodGroup);

	public Donor findByGender(String gender);

	public List<Donor> findByEmail(String email);

//	@Query("SELECT COALESCE(SUM(d.units), 0) FROM Donor d WHERE d.bloodGroup = :bloodGroup")
//	int getAvailableUnitsByBloodGroup(@Param("bloodGroup") String bloodGroup);

	@Query(value = "select * from donor", nativeQuery = true)
	public List<Donor> findBloodDetails();

	@Transactional
	@Modifying
	@Query(value = "delete from donor where name = ?1", nativeQuery = true)
	public void deleteByUsername(String name);

	@Transactional
	@Modifying
	@Query(value = "UPDATE donor SET status = 'accept' WHERE email = ?1 AND id = ?2", nativeQuery = true)
	public void acceptStatus(String email, int id);

	@Transactional
	@Modifying
	@Query(value = "UPDATE donor SET status = 'reject' WHERE email = ?1 AND id = ?2", nativeQuery = true)
	public void rejectStatus(String email, int id);

}