package com.aureum.backend.service;

import com.aureum.backend.dto.AuthDTOs.*;
import com.aureum.backend.model.User;
import com.aureum.backend.repository.UserRepository;
import com.aureum.backend.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Login karo — token return karo
    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ya password galat hai"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Email ya password galat hai");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(), user.getId(), user.getRole().name()
        );

        UserInfo userInfo = new UserInfo(
                user.getId(), user.getName(), user.getEmail(), user.getRole().name()
        );

        return new AuthResponse(token, userInfo);
    }

    // Naya account banao
    public AuthResponse signup(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Yeh email pehle se registered hai");
        }

        if (req.getPassword() == null || req.getPassword().length() < 6) {
            throw new RuntimeException("Password kam se kam 6 characters ka hona chahiye");
        }

        String hashedPassword = passwordEncoder.encode(req.getPassword());
        User newUser = new User(req.getName(), req.getEmail(), hashedPassword);
        User saved = userRepository.save(newUser);

        String token = jwtUtil.generateToken(
                saved.getEmail(), saved.getId(), saved.getRole().name()
        );

        UserInfo userInfo = new UserInfo(
                saved.getId(), saved.getName(), saved.getEmail(), saved.getRole().name()
        );

        return new AuthResponse(token, userInfo);
    }
}
