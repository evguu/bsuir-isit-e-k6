package com.example.demo.repositories;

import com.example.demo.models.Organization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface OrganizationRepository extends PagingAndSortingRepository<Organization, Integer> {
    Page<Organization> findAll(Specification<Organization> spec, Pageable page);
}
