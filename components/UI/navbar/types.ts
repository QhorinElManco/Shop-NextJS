import { TablerIconsProps } from '@tabler/icons-react';
import { ReactElement } from 'react';

export interface LinkData {
  icon: (props: TablerIconsProps) => ReactElement;
  label: string;
  href: string;
}
