package com.preparation.urlChopper.repository;

import com.preparation.urlChopper.models.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {

    public User findByUsername(String username);
}
