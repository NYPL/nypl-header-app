export {};

declare global {
  interface Window {
    dataLayer: any[];
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            layout?: any;
            includedLanguages?: string;
            autoDisplay?: boolean;
          },
          containerId: string,
        ) => void;
      };
    };
  }
}
