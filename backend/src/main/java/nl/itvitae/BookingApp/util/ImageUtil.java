package nl.itvitae.BookingApp.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Blob;
import java.sql.SQLException;
import javax.sql.rowset.serial.SerialBlob;

public class ImageUtil {

  public static Blob createBlobFromImagePath(String imagePath) {

    try {
      byte[] fileContent = Files.readAllBytes(Path.of(imagePath));
      return new SerialBlob(fileContent);
    } catch (IOException e) {
      System.out.println(e.getMessage());
      return null;
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }
}
