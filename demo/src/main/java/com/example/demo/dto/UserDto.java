package com.example.demo.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.example.demo.validators.PasswordMatches;
import lombok.Data;

@Data
@PasswordMatches
public class UserDto {
    @NotNull(message = "Логин не может быть пустым")
    @NotEmpty(message = "Логин не может быть пустым")
    private String username;

    @NotNull(message = "Пароль не может быть пустым")
    @NotEmpty(message = "Пароль не может быть пустым")
    private String password;
    private String matchingPassword;
}
