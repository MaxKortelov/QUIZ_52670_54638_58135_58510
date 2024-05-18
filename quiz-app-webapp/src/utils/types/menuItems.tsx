export type MenuItem = {
  id?: string;
  label: string;
  icon?: JSX.Element;
  isDisabled?: boolean;
  onClick?: () => void;
  key: string;
};
