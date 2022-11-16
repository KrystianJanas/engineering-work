export interface LeftSidebarOption {
  name: string;
  placeholder: string;
  href: string;
}

export interface LeftSidebarTypes {
  options: LeftSidebarOption[];
  onClick: (selected: string) => void;
  selected: string;
}
