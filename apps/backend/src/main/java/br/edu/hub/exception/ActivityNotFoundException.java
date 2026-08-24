package br.edu.hub.exception;

public class ActivityNotFoundException extends RuntimeException {
    public ActivityNotFoundException() {
        super("Activity not found");
    }
    
}
