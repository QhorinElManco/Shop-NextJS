import { TablerIconsProps } from '@tabler/icons-react';

export interface LinkData {
  icon: (props: TablerIconsProps) => Element;
  label: string;
  href: string;
}
