package com.app.Services; 
 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Repository.RegistrationRepository;
import com.app.entity.User; 
 
@Service 
public class RegistrationService 
{ 
 @Autowired 
 private RegistrationRepository registrationRepo; 
  
 public User loadUserByEmail(String email) throws Exception 
 { 
  User user = registrationRepo.findByEmail(email); 
  return user; 
 } 
  
 public User saveUser(User user) 
 { 
  return registrationRepo.save(user); 
 } 
 public User updateUserProfile(User user) 
 { 
  return registrationRepo.save(user); 
 } 
  
 public User fetchUserByEmail(String email) 
 { 
  return registrationRepo.findByEmail(email); 
 } 
  
 public User fetchUserByEmailAndPassword(String email, String password) 
 { 
  return registrationRepo.findByEmailAndPassword(email, password); 
 } 
  
 public List<User> getAllUsers() 
 { 
  return (List<User>)registrationRepo.findAll(); 
 } 
  
 public List<User> fetchProfileByEmail(String email) 
 { 
  return (List<User>)registrationRepo.findProfileByEmail(email); 
 } 
 

}