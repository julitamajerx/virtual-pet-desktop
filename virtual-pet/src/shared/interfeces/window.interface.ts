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
    system: {
      getProcesses: () => Promise<any[]>;
    };
    petStorage: {
      getName(): Promise<string>;
      setName(name: string): Promise<void>;
    };
  }
}
