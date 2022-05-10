package com.example.demo.services;

import com.example.demo.models.Organization;
import com.example.demo.repositories.OrganizationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class OrganizationService {
    OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Page<Organization> findAll(Specification<Organization> spec, Pageable page) {
        return organizationRepository.findAll(spec, page);
    }
}
