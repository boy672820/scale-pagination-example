import {
  DateTimeFormatter,
  ZoneOffset,
  ZonedDateTime,
  nativeJs,
} from '@js-joda/core';

export class DateTime {
  private constructor(private readonly value: ZonedDateTime) {}

  static fromDate = (date: Date): DateTime =>
    new DateTime(ZonedDateTime.from(nativeJs(date, ZoneOffset.ofHours(9))));

  format = (pattern: string): string =>
    this.value.format(DateTimeFormatter.ofPattern(pattern));

  toTimesetamp = () => this.value.toEpochSecond();

  toISOString = () => this.value.toString();
}
