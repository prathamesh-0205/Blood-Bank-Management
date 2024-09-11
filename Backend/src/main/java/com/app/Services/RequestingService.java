package com.app.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Repository.DonorRepository;
import com.app.Repository.InventoryRepository;
import com.app.Repository.RequestingBloodRepository;
import com.app.entity.Inventory;
import com.app.entity.Requesting;
@Service
public class RequestingService {
	@Autowired
	private DonorRepository donorRepository;

	@Autowired
	private InventoryRepository inventoryRepository;

	@Autowired
	private RequestingBloodRepository requestingBloodRepository;

	public void updateStatus(String email, int id) {
		requestingBloodRepository.updateStatus(email, id);
		System.out.println("Updated");
	}

	public void rejectStatus(String email, int id) {
		requestingBloodRepository.rejectStatus(email, id);
	}

	public List<Requesting> getRequestHistory() {
		return (List<Requesting>) requestingBloodRepository.findAll();
	}

	public List<Requesting> getRequestHistoryByEmail(String email) {
		return (List<Requesting>) requestingBloodRepository.findByEmail(email);
	}
	
	public Requesting saveBloodRequest(Requesting request) 
	 { 
		 
		 Inventory inventory = inventoryRepository.findByBloodGroup(request.getBloodgroup());
		 
		 if (request.getStatus() == null) {
	         request.setStatus("pending");
	     }
		 if (inventory != null) {
		        // Set the inventory reference in the donor entity
		        request.setInventory(inventory);
		 }
	  return requestingBloodRepository.save(request); 
	 } 

	public boolean isAvailable(String bloodGroup, Integer units) {
		int availableUnits = requestingBloodRepository.getAvailableUnitsByBloodGroup(bloodGroup);
		return availableUnits >= units;
	}

}
