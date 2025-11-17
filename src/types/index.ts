import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface NavItem {
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  active?: boolean;
  path?: string;
}

export interface MostOrderedItem {
    name: string;
    price: string;
    image: string;
}
