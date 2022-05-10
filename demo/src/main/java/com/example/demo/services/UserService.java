package com.example.demo.services;

import com.example.demo.dto.UserDto;
import com.example.demo.exceptions.UserAlreadyExistException;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleService roleService;

    public User findById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User registerNewUserAccount(UserDto userDto) throws UserAlreadyExistException {
        if (usernameExists(userDto.getUsername())) {
            throw new UserAlreadyExistException("Это имя пользователя уже занято: "
                    + userDto.getUsername());
        }

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRoles(Set.of(roleService.findByName("USER")));
        user.setEnabled(false);

        return userRepository.save(user);
    }

    public List<User> findUnactivatedUsers(){
        return userRepository.findByEnabledFalse();
    }

    public void activateUser(User user){
        user.setEnabled(true);
        userRepository.save(user);
    }

    public void deactivateUser(User user) {
        user.setEnabled(false);
        userRepository.save(user);
    }

    public void grantRoleToUser(User user, String roleName) {
        user.getRoles().add(roleService.findByName(roleName));
        userRepository.save(user);
    }

    public void revokeRoleFromUser(User user, String roleName) {
        user.getRoles().remove(roleService.findByName(roleName));
        userRepository.save(user);
    }

    private boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}