export {};

declare global {
  interface Window {
    dataLayer: any[];
    gtranslateSettings?: {
      default_language: string;
      languages: string[];
      native_language_names: boolean;
      wrapper_selector: string;
    };
  }
}
