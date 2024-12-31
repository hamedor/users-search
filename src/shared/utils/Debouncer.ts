export class Debouncer<T extends (...args: any[]) => void> {
  private func: T;
  private delay: number;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(func: T, delay: number = 500) {
    this.func = func;
    this.delay = delay;
  }

  call(...args: Parameters<T>): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.func.apply(this, args);
    }, this.delay);
  }

  cancel(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  flush(...args: Parameters<T>): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
      this.func.apply(this, args);
    }
  }

  isPending(): boolean {
    return this.timeout !== null;
  }
}