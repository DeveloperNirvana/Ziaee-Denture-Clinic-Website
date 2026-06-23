import { ReactNode } from 'react';
type ContainerSize = 'default' | 'lg';
type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};
export default function Container({ children, className = '', size = 'default' }: ContainerProps) {
  const sizeClass = size === 'lg' ? 'max-w-[var(--container-main-lg)]' : 'max-w-[var(--container-main)]';
  return <div className={`mx-auto w-full px-4 ${sizeClass} ${className}`}>{children}</div>;
}