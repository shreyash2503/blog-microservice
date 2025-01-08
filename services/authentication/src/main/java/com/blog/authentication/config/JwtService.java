package com.blog.authentication.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String SECRET_KEY = "UWaNHq1sR+3HEYyrcqO1MLa4zgtR9mYHW/wRYNsBzKRlqBMUD8U3sLUS0+j2RsN2tfNV4rQhhxfcmNmDldk94EOtDiAxg8By6YUod0fXIgWGykeb7VYg5s/NzS1UTTe8Fj7ddB522HwR3iCz97sF3H2oUW0MFYtJr9eF61MG+ZHbaw4FWeqGwqc9W0is/Q4ceLzBR3ndS+gsT/5sdMVpAt+oVa0Z08WG0BCRJrFyJhcxOkC2UGGGQVxcGUHS/ICP5zgWcOp3/iDswC6MBkl3W1T4BFmGyrBhjArGWaCwo2ae0/Z0rvSkeERgF4+AMFNRIjAYEcERFUhG1kgwL1/vAw==";
    public String extractUsername(String jwt){
        return extractClaim(jwt, (claims) -> claims.getSubject());
    }
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000 * 7))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public boolean isValid(String token, UserDetails userDetails) {
        final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, new Function<Claims, Date>() {
            @Override
            public Date apply(Claims claims) {
                return claims.getExpiration();

            }
        });
    }


    private Key getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
