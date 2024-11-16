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
}
