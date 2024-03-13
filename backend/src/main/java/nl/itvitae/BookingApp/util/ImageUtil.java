package nl.itvitae.BookingApp.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.apache.tomcat.util.codec.binary.Base64;

public class ImageUtil {

  public static String getImageFromPathAsBase64String(String imagePath) {
    try {
      byte[] fileContent = Files.readAllBytes(Path.of(imagePath));
      return "data:image/png;base64," + Base64.encodeBase64String(fileContent);
    } catch (IOException e) {
      System.out.println(e.getMessage());
      return null;
    }
  }
}
