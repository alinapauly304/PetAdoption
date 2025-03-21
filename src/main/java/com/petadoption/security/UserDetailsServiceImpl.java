package com.petadoption.security;

import com.petadoption.model.Adopter;
import com.petadoption.model.Shelter;
import com.petadoption.repository.AdopterRepository;
import com.petadoption.repository.ShelterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdopterRepository adopterRepository;

    @Autowired
    private ShelterRepository shelterRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // First try to find an adopter
        Optional<Adopter> adopter = adopterRepository.findByUsername(username);
        if (adopter.isPresent()) {
            return new User(
                adopter.get().getUsername(),
                adopter.get().getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADOPTER"))
            );
        }

        // If not an adopter, try to find a shelter
        Optional<Shelter> shelter = shelterRepository.findByUsername(username);
        if (shelter.isPresent()) {
            return new User(
                shelter.get().getUsername(),
                shelter.get().getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_SHELTER"))
            );
        }

        throw new UsernameNotFoundException("User not found with username: " + username);
    }
} 