package nl.itvitae.BookingApp.hotel;

import static nl.itvitae.BookingApp.util.EnumUtil.enumName;

public enum Location {
  AMSTERDAM,
  ROTTERDAM,
  PRAGUE,
  BARCELONA,
  VIENNA,
  BERLIN;

  @Override
  public String toString() {
    return enumName(this.name());
  }
}
