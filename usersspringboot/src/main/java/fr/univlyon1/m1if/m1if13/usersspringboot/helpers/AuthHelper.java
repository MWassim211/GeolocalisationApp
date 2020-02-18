package fr.univlyon1.m1if.m1if13.usersspringboot.helpers;

import java.util.Date;
import java.util.Map;
import java.util.Objects;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.exceptions.JWTVerificationException;

public class AuthHelper {

    private static final String ISSUER = "tp-rest-api-back";
    private static final Algorithm ALGORITHM = Algorithm.HMAC256("secret");
    
    static public Map<String, Claim>  verifyToken(String token){
        try {
            JWTVerifier verifier = JWT.require(ALGORITHM).withIssuer(ISSUER).build();
            return verifier.verify(Objects.requireNonNull(token)).getClaims();
        }catch (JWTVerificationException e) {
            return null;
        }
    } 
    
    public static String createToken(String login, String origin) {
        return JWT.create().withIssuer(ISSUER).withClaim("login", login).withClaim("Origin", origin)
                .withExpiresAt(new Date(System.currentTimeMillis() + 86400 * 1000)).sign(ALGORITHM);
    }


}