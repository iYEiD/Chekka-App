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
}
