package nl.itvitae.BookingApp.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.tomcat.util.codec.binary.Base64;

public class ImageUtil {

  public static String convertImagePathToBase64String(String imagePath) {
    try {
      Path path = Path.of(imagePath);
      byte[] fileContent = Files.readAllBytes(path);
      String mimeType = Files.probeContentType(path);

      // Results in for example "data:image/png;base64,(image encoded as base64 string)"
      return "data:" + mimeType + ";base64," + Base64.encodeBase64String(fileContent);
    } catch (IOException e) {
      System.out.println(e.getMessage());
      return null;
    }
  }

  public static String saveBase64Image(String base64Image, String fileName) {
    try {
      // Create a directory if it doesn't exist
      Files.createDirectories(Paths.get("src/main/resources/static/images"));

      // Results in "data:image/png;base64,(image encoded as base64 string)"
      String[] base64ImageParts = base64Image.split(",");

      // Decode Base64 to byte array
      byte[] decodedBytes = Base64.decodeBase64(base64ImageParts[1]);

      // Generate a file path
      Pattern pattern = Pattern.compile("image/(?<fileType>\\w+);base64");
      Matcher matcher = pattern.matcher(base64ImageParts[0]);

      if (matcher.find()) {
        String fileType = matcher.group("fileType");
        String filePath =
            "src/main/resources/static/images" + File.separator + fileName + "." + fileType;
        System.out.println(filePath);

        // Save the decoded bytes to file
        Path destinationFile = Paths.get(filePath);
        Files.write(destinationFile, decodedBytes);

        return filePath; // Return the path where the image is saved
      }

    } catch (IOException e) {
      System.out.println(e.getMessage());
    }

    return null;
  }
}
