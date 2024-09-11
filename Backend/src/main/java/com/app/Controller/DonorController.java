package com.app.Controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.app.entity.Donor;
import com.app.entity.Requesting;
import com.app.entity.User;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

@RestController
@RequestMapping("donor")
@CrossOrigin(origins = "http://localhost:3000")
public class DonorController {

	@Autowired
	private DonorService donorService;

	@Autowired
	private InventoryService inventoryService;

	@Autowired
	private RegistrationService registrationService;

	private static final String ACCEPTED_STATUS = "accepted";
	private static final String REJECTED_STATUS = "rejected";

	@PostMapping("/addDonor")
	public ResponseEntity<Donor> addNewDonor(@RequestBody Donor donor) {
		return new ResponseEntity<>(donorService.saveDonor(donor), HttpStatus.CREATED);
	}

	@DeleteMapping("/deleteDonor/{id}")
	public void deleteDonor(@PathVariable int id) {
		donorService.deleteDonor(id);
		System.out.println("deleted succesfully");
	}

	@PostMapping("/addAsDonor")
	public ResponseEntity<Donor> addUserAsDonor(@RequestBody Donor donor) {
		return new ResponseEntity<>(donorService.saveUserAsDonor(donor), HttpStatus.CREATED);
	}

	@GetMapping("/acceptStatusOfDonor/{email}/{id}")
	public ResponseEntity<List<String>> updateStatusOfDonor(@PathVariable String email, @PathVariable int id) {
		donorService.acceptStatusOfDonor(email, id);
		return createStatusResponse(ACCEPTED_STATUS);
	}

	@GetMapping("/rejectStatusOfDonor/{email}/{id}")
	public ResponseEntity<List<String>> rejectStatusOfDonor(@PathVariable String email, @PathVariable int id) {
		donorService.rejectStatusOfDonor(email, id);
		return createStatusResponse(REJECTED_STATUS);
	}

	@GetMapping("/donorlist")
	public ResponseEntity<List<Donor>> getDonors() {
		return new ResponseEntity<>(donorService.getAllDonors(), HttpStatus.OK);
	}

	@GetMapping("/donorHistory")
	public ResponseEntity<List<Donor>> getdonorRequestHistory() {
		return new ResponseEntity<>(donorService.getdonorRequestHistory(), HttpStatus.OK);
	}

	@GetMapping("/donorRequestHistory/{email}")
	public ResponseEntity<List<Donor>> getDonorRequestHistoryByEmail(@PathVariable String email) {
		return new ResponseEntity<>(donorService.getDonorRequestHistoryByEmail(email), HttpStatus.OK);
	}

	@GetMapping("/getTotalBloodGroups")
	public ResponseEntity<Integer> getTotalBloodGroups() {
		List<String> bloodGroups = donorService.getBloodDetails().stream().map(Donor::getBloodGroup)
				.collect(Collectors.toList());
		Set<String> uniqueBloodGroups = new HashSet<>(bloodGroups);
		return new ResponseEntity<>(uniqueBloodGroups.size(), HttpStatus.OK);
	}

	@GetMapping("/getTotalUnits")
	public ResponseEntity<Integer> getTotalUnits() {
		return new ResponseEntity<>(donorService.getBloodDetails().stream().mapToInt(Donor::getUnits).sum(),
				HttpStatus.OK);
	}

	@GetMapping("/getAcceptedDonationCount/{email}")
	public ResponseEntity<Integer> getAcceptedDonationCount(@PathVariable String email) {
		Integer acceptedCount = donorService.countAcceptedDonations(email);
		return ResponseEntity.ok(acceptedCount != null ? acceptedCount : 0);
	}

	@GetMapping("/userlist")
	public ResponseEntity<List<User>> getUsers() {
		return new ResponseEntity<>(registrationService.getAllUsers(), HttpStatus.OK);
	}

	@GetMapping("/profileDetails/{email}")
	public ResponseEntity<List<User>> getProfileDetails(@PathVariable String email) {
		return new ResponseEntity<>(registrationService.fetchProfileByEmail(email), HttpStatus.OK);
	}

	private ResponseEntity<List<String>> createStatusResponse(String status) {
		List<String> response = new ArrayList<>();
		response.add(status);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/downloadcertificate/{donorId}")
	public ResponseEntity<InputStreamResource> downloadCertificate(@PathVariable int donorId)
			throws DocumentException, IOException {

		Document document = new Document();

		ByteArrayOutputStream out = new ByteArrayOutputStream();

		PdfWriter.getInstance(document, out);

		document.open();

		document.add(new Paragraph("Certificate of Appreciation"));
		document.add(new Paragraph(
				"This is to certify that the donor with ID: " + donorId + " has successfully donated blood."));

		document.close();

		ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "attachment; filename=donor_certificate_" + donorId + ".pdf");

		return ResponseEntity.ok().headers(headers).contentType(org.springframework.http.MediaType.APPLICATION_PDF)
				.body(new InputStreamResource(in));
	}

}
