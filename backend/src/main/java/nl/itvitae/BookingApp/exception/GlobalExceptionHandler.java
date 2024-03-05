package nl.itvitae.BookingApp.exception;

import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ProblemDetail> handleAllExceptions(Exception e) {
    var problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problemDetail);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ProblemDetail> handleNotFoundException(ResourceNotFoundException e) {
    var problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problemDetail);
  }

  // Thread on appropriate status code
  // https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists/70371989#70371989
  @ExceptionHandler(ResourceAlreadyExistsException.class)
  public ResponseEntity<ProblemDetail> handleUserAlreadyExistsException(
      ResourceAlreadyExistsException e) {
    var problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());

    return ResponseEntity.status(HttpStatus.CONFLICT).body(problemDetail);
  }

  @ExceptionHandler(IOException.class)
  public ResponseEntity<ProblemDetail> handleSqlException(IOException e) {
    var problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problemDetail);
  }
}
