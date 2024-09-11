package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.User;

public interface RegistrationRepository extends JpaRepository<User, Integer> {

	public User findByEmail(String email);

	public User findByUsername(String username);

	public User findByEmailAndPassword(String email, String password);

	public List<User> findProfileByEmail(String email);

}