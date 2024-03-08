const config = useRuntimeConfig();
export class Helper {
  static isTestMode(): boolean {
    return config.public.api.isMockActive === true;
  }
}
