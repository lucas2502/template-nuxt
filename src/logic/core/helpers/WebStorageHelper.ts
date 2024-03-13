export class WebStorageHelper {
  public static setItem({ key, value }: { key: string; value: any }): void {
    let val;

    if (typeof value === 'object' || Array.isArray(value)) {
      val = JSON.stringify(value);
    } else {
      val = value;
    }

    val && window.localStorage.setItem(key, val);
  }

  public static getItem(key: string): any {
    const val = window.localStorage.getItem(key);

    if (val) {
      return JSON.parse(val);
    } else {
      return val;
    }
  }

  public static removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}
