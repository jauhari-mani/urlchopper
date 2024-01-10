package com.preparation.urlChopper.service;

import com.preparation.urlChopper.models.User;
import com.preparation.urlChopper.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User addUser(User userObj) {
        userObj.setPassword(passwordEncoder.encode(userObj.getPassword()));
        userObj.setRoles(List.of("User"));
        return  userRepository.save(userObj);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean deleteUserByUsername(String username) {
        try {
            User userObj = userRepository.findByUsername(username);
            userRepository.delete(userObj);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    public User updateUser(User user, String username) {
//        write the logic to fetch username and password from the user's JWT token and update the user document.
        User userObj = userRepository.findByUsername(username);
        userObj.setPassword(user.getPassword());
        userObj.setUsername(user.getUsername());
        return userRepository.save(userObj);
    }
}
