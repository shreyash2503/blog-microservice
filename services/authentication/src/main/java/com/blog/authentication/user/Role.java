package com.blog.authentication.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.blog.authentication.user.Permission.*;

@Getter
@RequiredArgsConstructor
public enum Role {
    USER(Collections.emptySet()),
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_DELETE,
                    ADMIN_CREATE,
                    MANAGER_READ,
                    MANAGER_UPDATE,
                    MANAGER_DELETE,
                    MANAGER_CREATE
            )
    ),
    MANAGER(
            Set.of(
                    MANAGER_READ,
                    MANAGER_UPDATE,
                    MANAGER_DELETE,
                    MANAGER_CREATE
            )
    )
    ;

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .toList();

        /*
        Roles vs. Authorities in Spring Security
Roles:

Roles are typically prefixed with ROLE_ (e.g., ROLE_ADMIN, ROLE_MANAGER).
Spring Security distinguishes roles by the ROLE_ prefix.
When you use @PreAuthorize("hasRole('ADMIN')"), Spring Security internally converts it to check for hasAuthority('ROLE_ADMIN').
Authorities:

Authorities represent specific permissions (e.g., admin:read, manager:create).
These do not require any specific prefix and are matched as-is.
         */
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }

}
