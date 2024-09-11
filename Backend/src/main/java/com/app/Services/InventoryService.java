package com.app.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Repository.DonorRepository;
import com.app.Repository.InventoryRepository;
import com.app.Repository.RequestingBloodRepository;
import com.app.entity.Donor;
import com.app.entity.Inventory;
import com.app.entity.Requesting;

@Service
public class InventoryService {

	@Autowired
	private RequestingBloodRepository requestingBloodRepository;

	@Autowired
	private InventoryRepository inventoryRepository;

	@Autowired
	private DonorRepository donorRepository;

	public void updateInventoryForAcceptedDonor(int donorId) {
		Donor donor = donorRepository.findById(donorId).orElseThrow(() -> new RuntimeException("Donor not found"));

		if ("accept".equalsIgnoreCase(donor.getStatus())) {
			Inventory inventory = donor.getInventory();
			if (inventory != null) {
				// Update the inventory units
				inventory.setTotalUnits(inventory.getTotalUnits() + donor.getUnits());
				inventoryRepository.save(inventory);
			}
		}
	}

	public void updateInventoryForAcceptedRequest(int requestId) {
		Requesting request = requestingBloodRepository.findById(requestId)
				.orElseThrow(() -> new RuntimeException("Donor not found"));

		if ("accept".equalsIgnoreCase(request.getStatus())) {
			Inventory inventory = request.getInventory();
			if (inventory != null) {
				// Update the inventory units
				inventory.setTotalUnits(inventory.getTotalUnits() - request.getUnits());
				inventoryRepository.save(inventory);
			}
		}
	}

	public java.util.List<Inventory> findAllBloodDetails() {
		try {
			return inventoryRepository.findAll();
		} catch (Exception e){

			System.err.println("Error occurred while fetching blood details: " + e.getMessage());

			throw new RuntimeException("Failed to fetch blood details", e);
		}
	}

	public Inventory updateBloodStock(String bloodGroup, int change) throws Exception {
		Inventory bloodDetail = inventoryRepository.findByBloodGroup(bloodGroup);
		if (bloodDetail == null) {
			throw new Exception("Blood group not found.");
		}

		bloodDetail.setTotalUnits(bloodDetail.getTotalUnits() + change);
		if (bloodDetail.getTotalUnits() < 0) {
			bloodDetail.setTotalUnits(0); // Ensure units don't go negative
		}

		return inventoryRepository.save(bloodDetail);
	}

}
