import { ReactNode } from 'react';
import MenuEmpresa from '../componentesEmpresa/menuEmpresa/menuEmpresa';
import CabecalhoEmpresa from '../componentesEmpresa/cabecalhoEmpresa/cabecalhoEmpresa';

interface LayoutEmpresaProps {
  children: ReactNode;
}


export default function LayoutAdmin({ children }: LayoutEmpresaProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <MenuEmpresa />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CabecalhoEmpresa/>
        <main style={{ flex: 1, padding: '24px' }}>{children}</main>
      </div>
    </div>
  );
}