package com.blog.authentication.token;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends MongoRepository<Token, String> {

    @Query(value = "{'user.$id' : ?0, $or: [{'expired' :  false}, {'revoked' :  false}]}")
    List<Token> findAllValidTokenByUser(String userId);

    Optional<Token> findByToken(String token);
}
