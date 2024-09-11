package com.app.Controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.Services.RegistrationService;
import com.app.entity.User;

@RequestMapping("registration")
@RestController
public class RegistrationController {
	@Autowired
	private RegistrationService registerService;

	@GetMapping("/register")
	public String welcomeMessage() {
		return "Welcome to Blood Bank Management system !!!";
	}

	@PostMapping("/register")
	@CrossOrigin(origins = "http://localhost:3000")
	public User registerUser(@RequestBody User user) throws Exception {
		String currEmail = user.getEmail();
		if (currEmail != null || !"".equals(currEmail)) {
			User userObj = registerService.fetchUserByEmail(currEmail);
			if (userObj != null) {
				throw new Exception("User with " + currEmail + " already exists !!!");
			}
		}
		User userObj = null;
		userObj = registerService.saveUser(user);
		return userObj;
	}

	@PostMapping("/login")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> loginUser(@RequestBody User user) {
		String currEmail = user.getEmail();
		String currPassword = user.getPassword();

		User userObj = null;
		if (currEmail != null && currPassword != null) {
			userObj = registerService.fetchUserByEmailAndPassword(currEmail, currPassword);
		}
		if (userObj == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("User does not exist! Please enter valid credentials.");
		}
		return ResponseEntity.ok(Collections.singletonMap("email", userObj.getEmail()));
	}

	@PutMapping("/updateuser")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<User> updateUserProfile(@RequestBody User user) throws Exception {
		registerService.updateUserProfile(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
}