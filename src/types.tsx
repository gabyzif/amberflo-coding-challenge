export interface Column {
  id: string;
  displayName: string;
  width: string;
  alignment: 'initial' | 'left' | 'center' | 'right' | 'justify' | 'initial';
}
