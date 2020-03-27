declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.json';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

declare module 'umi' {
  interface AccessProps {
    accessible: boolean;
    fallback?: React.ReactNode;
  }

  export function useModel(
    model: string,
  ): {
    refresh(): Promise<void>;
    initialState: any;
    loading: boolean;
    error: Error | undefined;
  };

  export function Access(props: React.PropsWithChildren<AccessProps>): JSX.Element;

  export function useAccess(): boolean;
}
