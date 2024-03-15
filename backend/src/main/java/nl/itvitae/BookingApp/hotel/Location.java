package nl.itvitae.BookingApp.hotel;

import nl.itvitae.BookingApp.util.EnumUtil;

public enum Location {
  AMSTERDAM,
  ROTTERDAM,
  PRAGUE,
  BARCELONA,
  VIENNA,
  BERLIN;

  @Override
  public String toString() {
    return EnumUtil.enumName(this.name());
  }
}
