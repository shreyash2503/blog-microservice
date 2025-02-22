package com.blog.authentication.auth;

import com.blog.authentication.config.JwtService;
import com.blog.authentication.exceptions.UserNotFoundException;
import com.blog.authentication.exceptions.UsernameExistsException;
import com.blog.authentication.kafka.AccountCreationConfirmation;
import com.blog.authentication.kafka.AccountCreationConfirmationCreator;
import com.blog.authentication.token.Token;
import com.blog.authentication.token.TokenRepository;
import com.blog.authentication.user.User;
import com.blog.authentication.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AuthenticationMapper authenticationMapper;
    private final TokenRepository tokenRepository;
    private final AccountCreationConfirmationCreator accountCreationConfirmationCreator;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = authenticationMapper.toUser(request);
        // Check if user exists and return 201 instead of 200
        var prevUser = userRepository.findByEmail(user.getEmail());
        if (prevUser.isPresent()) {
            throw new UsernameExistsException("User already exists.");

        }
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveToken(user, jwtToken);
        AccountCreationConfirmation accountCreationConfirmation = new AccountCreationConfirmation(
                user.getUsername(),
                user.getCreatedAt(),
                user.getFirstname(),
                user.getLastname()
        );
        accountCreationConfirmationCreator.sendAccountCreationConfirmation(accountCreationConfirmation);
        return authenticationMapper.toAuthenticationResponse(jwtToken, refreshToken);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws AuthenticationException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("User does not exist"));
            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            revokeAlluserTokens(user);
            saveToken(user, jwtToken);
            return authenticationMapper.toAuthenticationResponse(jwtToken, refreshToken);
        } catch (BadCredentialsException exp) {
            throw new AuthenticationException("Bad credentials provided");
        } catch (Exception exp) {
            throw new AuthenticationException("Authentication Failed: " + exp.getMessage());
        }
    }

    private void saveToken(User user, String jwtToken) {
        var token = Token.builder()
                .token(jwtToken)
                .expired(false)
                .revoked(false)
                .user(user)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAlluserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);

    }
}
