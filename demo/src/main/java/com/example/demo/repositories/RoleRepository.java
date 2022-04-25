package com.example.demo.repositories;

import com.example.demo.models.Role;
import com.example.demo.models.SoilBedrock;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role findByName(String name);
}
