package nl.itvitae.BookingApp.util;

public class EnumUtil {

  public static String simpleEnumName(String enumName) {
    return enumName.substring(0, 1).toUpperCase()
        + enumName.substring(1).toLowerCase().replace("_", " ");
  }
}
