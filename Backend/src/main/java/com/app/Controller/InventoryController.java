package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Services.DonorService;
import com.app.Services.InventoryService;
import com.app.entity.Inventory;

@RestController
@RequestMapping("inventory")
@CrossOrigin(origins = "http://localhost:3000")
public class InventoryController {

	@Autowired
	private InventoryService inventoryService;

	@Autowired
	private DonorService donorService;

	@PutMapping("/update/{donorId}")
	public ResponseEntity<String> updateInventoryForAcceptedDonor(@PathVariable int donorId) {
		try {
			inventoryService.updateInventoryForAcceptedDonor(donorId);
			return ResponseEntity.ok("Inventory updated successfully for donor ID: " + donorId);
		} catch (RuntimeException e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}

	@PutMapping("/updateInventory/{requestId}")
	public ResponseEntity<String> updateInventoryForAcceptedRequest(@PathVariable int requestId) {
		try {
			inventoryService.updateInventoryForAcceptedRequest(requestId);
			return ResponseEntity.ok("Inventory updated successfully for request ID: " + requestId);
		} catch (RuntimeException e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}

	@GetMapping("/getAll")
	public ResponseEntity<List<Inventory>> getAll() {
		try {
			List<Inventory> inventoryList = (List<Inventory>) inventoryService.findAllBloodDetails();
			donorService.checkforOldBloodSamples(donorService.getAllDonors());
			return ResponseEntity.ok(inventoryList);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}

	@GetMapping("/inventoryDetails")
	public ResponseEntity<List<Inventory>> getInventoryWithDonorCounts() {
		List<Inventory> inventories = donorService.getInventoryWithDonorCounts();
		return ResponseEntity.ok(inventories);
	}

	@PutMapping("/updateStock")
	public ResponseEntity<Inventory> updateBloodStock(@RequestParam String bloodGroup, @RequestParam int change) {
		try {
			Inventory updatedBloodDetail = inventoryService.updateBloodStock(bloodGroup, change);
			return ResponseEntity.ok(updatedBloodDetail);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(null);
		}
	}

}
