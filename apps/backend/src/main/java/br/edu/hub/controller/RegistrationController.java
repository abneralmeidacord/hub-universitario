package br.edu.hub.controller;

import br.edu.hub.dto.RegistrationRequest;
import br.edu.hub.dto.RegistrationResponse;
import br.edu.hub.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activities/{activityId}/registrations")
public class RegistrationController {
    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RegistrationResponse register(@PathVariable Long activityId,
                                         @Valid @RequestBody RegistrationRequest request) {
        return registrationService.register(activityId, request);
    }

    @GetMapping
    public List<RegistrationResponse> list(@PathVariable Long activityId) {
        return registrationService.list(activityId);
    }
}

