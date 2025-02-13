import {effect, signal, Signal} from "@angular/core";

export class HelperFunctions {

  public static debouncedSignal<T>(input: Signal<T>, timeOutMs = 0, skipEmit: boolean = false): Signal<T> {
    const debounceSignal = signal(input());
    if (skipEmit) {
      return debounceSignal
    }

    let timeout: any;

    effect(() => {
      if (timeout) {
        clearTimeout(timeout);
      }

      const value = input();
      timeout = setTimeout(() => {
        debounceSignal.set(value);
      }, timeOutMs);

      return () => {
        clearTimeout(timeout);
      };
    });

    return debounceSignal;
  }

  public static formatDateToCustomFormat(dateString: string): string {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');

    return `${dayOfWeek} ${month} ${day} ${year} @ ${hours}:00`;
  }

  public static formatFilterDate(dateString: string) {
    const date = new Date(dateString); // Parse the date string
    const day = String(date.getDate()).padStart(2, '0'); // Get day with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based, so add 1)
    const year = date.getFullYear(); // Get year
    const hour = String(date.getHours()).padStart(2, '0'); // Get hour with leading zero

    return dateString ? `${day}/${month}/${year}:${hour}:00` : null;
  }

  public static fromCamelToSnakeCase(value: string) {
    return value.replace(/([A-Z])/g, '_$1').toLowerCase();
  }

  public static fromCamelToTitleCase(value: string) {
    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, char => char.toUpperCase())
      .trim();
  }

  public static transformDate(inputDate: string): string {
    const date = new Date(inputDate.replace('@', '').trim());

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00';

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}
