package com.blog.authentication.user;

import com.blog.authentication.exceptions.UserNotFoundException;

import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();


       if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
           throw new IllegalStateException("Password are not the same");
       }
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong Password");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

    public void updateUser(UserRequest userRequest) {
        var user = userRepository.findByEmail(userRequest.email()).orElseThrow(() -> new UserNotFoundException("User does not exist"));
        mergeUser(userRequest, user);
        userRepository.save(user);
    }

    public void mergeUser(UserRequest userRequest, User user) {
        if (!StringUtils.isBlank(userRequest.firstname())) {
            user.setFirstname(userRequest.firstname().trim());
        }

        if (!StringUtils.isBlank(userRequest.lastname())) {
            user.setLastname(userRequest.lastname().trim());
        }
        if (!StringUtils.isBlank(userRequest.imageUrl())) {
            user.setImageUrl(userRequest.imageUrl().trim());

        }
    }

    public UserResponse getUser(String id) {
        var user = userRepository
                .findByEmail(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return userMapper.toUserResponse(user);
    }
}
