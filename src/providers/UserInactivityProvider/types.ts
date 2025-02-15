export type IUserInactivityContext = {
    resetTimer: () => void;
  };

export type IUserInactivityProvider = {
  children: React.JSX.Element;
  timeForInactivity: number;
  isLogin: boolean;
  onInactivityTimeout: () => void;
};
