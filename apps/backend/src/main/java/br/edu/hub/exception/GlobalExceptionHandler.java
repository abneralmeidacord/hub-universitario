package br.edu.hub.exception;

import br.edu.hub.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new LinkedHashMap<>();
        exception.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest()
                .body(new ErrorResponse("Validation failed", LocalDateTime.now(), errors));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(exception.getMessage()));
    }

    @ExceptionHandler(RegistrationNotAllowedException.class)
    ResponseEntity<ErrorResponse> handleRegistrationNotAllowed(RegistrationNotAllowedException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ErrorResponse.of(exception.getMessage()));
    }

    @ExceptionHandler(ActivityNotFoundException.class)
ResponseEntity<ErrorResponse> handleActivityNotFound(
        ActivityNotFoundException exception) {

    return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse.of(exception.getMessage()));
}
    @ExceptionHandler(EmailAlreadyRegisteredException.class)
    ResponseEntity<ErrorResponse> handleEmailAlreadyRegistered(EmailAlreadyRegisteredException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ErrorResponse.of(exception.getMessage()));
    }

}
