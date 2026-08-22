package br.edu.hub.exception;

public class RegistrationNotAllowedException extends RuntimeException {
    public RegistrationNotAllowedException(String message) {
        super(message);
    }
}
