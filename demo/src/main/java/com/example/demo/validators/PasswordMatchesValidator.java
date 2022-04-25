package com.example.demo.validators;

import com.example.demo.dto.UserDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator
        implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(PasswordMatches constraintAnnotation) {
    }
    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context){
        UserDto user = (UserDto) obj;
        System.out.println(user.getPassword()); // TODO: remove this
        System.out.println(user.getMatchingPassword());
        return user.getPassword().equals(user.getMatchingPassword());
    }
}