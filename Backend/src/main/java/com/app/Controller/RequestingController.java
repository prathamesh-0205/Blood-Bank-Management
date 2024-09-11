package com.app.Controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Services.DonorService;
import com.app.Services.InventoryService;
import com.app.Services.RegistrationService;
import com.app.Services.RequestingService;
import com.app.entity.Requesting;

@RestController
@RequestMapping("request")
@CrossOrigin(origins = "http://localhost:3000")
public class RequestingController {
	
	@Autowired
	private DonorService donorService;

	@Autowired
	private InventoryService inventoryService;

	@Autowired
	private RegistrationService registrationService;
	
	@Autowired
	private RequestingService requestingService;
	
	private static final String ACCEPTED_STATUS = "accepted";
	private static final String REJECTED_STATUS = "rejected";
	
	@GetMapping("/checkAvailability")
	public ResponseEntity<Boolean> checkAvailability(@RequestParam String bloodGroup, @RequestParam Integer units) {
		boolean isAvailable = requestingService.isAvailable(bloodGroup, units);
		return ResponseEntity.ok(isAvailable);
	}
	
	@PostMapping("/requestblood")
	public ResponseEntity<Requesting> addNewBloodRequest(@RequestBody Requesting request) {
		return new ResponseEntity<>(requestingService.saveBloodRequest(request), HttpStatus.CREATED);
	}
	
	@GetMapping("/acceptstatus/{email}/{id}")
	public ResponseEntity<List<String>> updateStatus(@PathVariable String email, @PathVariable int id) {
		requestingService.updateStatus(email, id);
		return createStatusResponse(ACCEPTED_STATUS);
	}

	@GetMapping("/rejectstatus/{email}/{id}")
	public ResponseEntity<List<String>> rejectStatus(@PathVariable String email, @PathVariable int id) {
		requestingService.rejectStatus(email, id);
		return createStatusResponse(REJECTED_STATUS);
	}
	
	@GetMapping("/requestHistory")
	public ResponseEntity<List<Requesting>> getRequestHistory() {
		return new ResponseEntity<>(requestingService.getRequestHistory(), HttpStatus.OK);
	}
	
	@GetMapping("/requestHistory/{email}")
	public ResponseEntity<List<Requesting>> getRequestHistoryByEmail(@PathVariable String email) {
		return new ResponseEntity<>(requestingService.getRequestHistoryByEmail(email), HttpStatus.OK);
	}

	// Method to create a status response
	private ResponseEntity<List<String>> createStatusResponse(String status) {
		return new ResponseEntity<>(Collections.singletonList(status), HttpStatus.OK);
	}
}
