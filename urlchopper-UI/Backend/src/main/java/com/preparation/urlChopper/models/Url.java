package com.preparation.urlChopper.models;

import com.mongodb.lang.NonNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "urls")
public class Url {

    @Id
    private ObjectId id;
    @NonNull
    @Indexed(unique = true)
    private String tinyKey;
    @NonNull
    private String fullURL;

}
