package com.app.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Repository.BloodBankRepository;
import com.app.entity.BloodBank;

@Service
public class BloodBankService {

    @Autowired
    private BloodBankRepository bloodbankRepository;

    public BloodBank fetchAdminByEmailAndPassword(String email, String password) {
        return bloodbankRepository.findByEmailAndPassword(email, password);
    }
}