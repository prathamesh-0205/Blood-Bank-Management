package com.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.BloodBank;

@Repository
public interface BloodBankRepository extends JpaRepository<BloodBank, Long> {
	BloodBank findByEmailAndPassword(String email, String password);
}
