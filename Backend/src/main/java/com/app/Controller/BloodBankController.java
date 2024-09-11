package com.app.Controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.Services.BloodBankService;
import com.app.entity.BloodBank;

@CrossOrigin(allowedHeaders = "*")
@RestController
@RequestMapping("bloodbank")
public class BloodBankController {

	@Autowired
	private BloodBankService bloodbankService;

	@PostMapping("/adminlogin")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> loginAdmin(@RequestBody BloodBank admin) {
		String currEmail = admin.getEmail();
		String currPassword = admin.getPassword();

		BloodBank adminObj = null;

		if (currEmail != null && currPassword != null) {
			adminObj = bloodbankService.fetchAdminByEmailAndPassword(currEmail, currPassword);
		}
		if (adminObj == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("Admin does not exist! Please enter valid credentials.");
		}
		return ResponseEntity.ok(Collections.singletonMap("email", adminObj.getEmail()));
	}
}
