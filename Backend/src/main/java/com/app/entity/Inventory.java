package com.app.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
public class Inventory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "blood_group")
	private String bloodGroup;

	@Column(name = "total_units")
	private int totalUnits;

	// Transient field to hold donor count
	@Transient
	private int donorCount;

	@OneToMany(mappedBy = "inventory")
	private List<Donor> donors;

	@OneToMany(mappedBy = "inventory")
	private List<Requesting> requests;

	public Inventory(int id, String bloodGroup, int totalUnits) {
		super();
		this.id = id;
		this.bloodGroup = bloodGroup;
		this.totalUnits = totalUnits;
	}

	public Inventory() {
		
	}

	public int getDonorCount() {
		return donorCount;
	}

	public void setDonorCount(int donorCount) {
		this.donorCount = donorCount;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public int getTotalUnits() {
		return totalUnits;
	}

	public void setTotalUnits(int totalUnits) {
		this.totalUnits = totalUnits;
	}

	
}
