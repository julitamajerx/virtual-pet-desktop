export interface ElectronWindowAPI {
  electronAPI: {
    closeApp: () => void;
  };
}

declare global {
  interface Window {
    logger: {
      save: (text: string) => void;
    };
  }
}
