package com.preparation.urlChopper.controller;

import com.preparation.urlChopper.models.User;
import com.preparation.urlChopper.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    private ResponseEntity<User> addUser(@RequestBody User userObj) {
        return new ResponseEntity<>(userService.addUser(userObj), HttpStatus.CREATED);
    }

    @GetMapping
    private ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @PutMapping("/{username}")
    private ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User userObj) {
        return new ResponseEntity<>(userService.updateUser(userObj, username), HttpStatus.OK);
    }

    @DeleteMapping("/{username}")
    private ResponseEntity<Boolean> deleteUser(@PathVariable String username) {
        return new ResponseEntity<>(userService.deleteUserByUsername(username), HttpStatus.NO_CONTENT);
    }

}
