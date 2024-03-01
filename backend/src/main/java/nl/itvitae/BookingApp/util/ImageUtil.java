package nl.itvitae.BookingApp.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.apache.tomcat.util.codec.binary.Base64;

public class ImageUtil {

  public static String getImageFromPathAsBase64String(String imagePath) {
    try {
      byte[] fileContent = Files.readAllBytes(Path.of(imagePath));
      return Base64.encodeBase64String(fileContent);
    } catch (IOException e) {
      return null;
    }
  }

  public static String[] getImageFromPathAsBase64StringArray(String[] imagePaths) {
    for (int i = 0; i < imagePaths.length; i++) {
      imagePaths[i] = getImageFromPathAsBase64String(imagePaths[i]);
    }
    return imagePaths;
  }
}
