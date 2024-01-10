package com.preparation.urlChopper.repository;

import com.preparation.urlChopper.models.Url;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UrlRepository extends MongoRepository<Url, ObjectId> {

    public Url findByTinyKey(String tinyKey);
}
