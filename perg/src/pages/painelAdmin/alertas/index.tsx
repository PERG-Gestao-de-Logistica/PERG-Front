import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import MenuAdmin from '@/components/componentesAdmin/menuAdmin/menuAdmin';
import CabecalhoAdmin from '@/components/componentesAdmin/cabecalhoAdmin/cabecalhoAdmin';

interface LayoutAdminProps {
  children: ReactNode;
}


export default function LayoutAdmin({ children }: LayoutAdminProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#03171a'}}>
      <MenuAdmin />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CabecalhoAdmin/>
        <main style={{ flex: 1, padding: '24px' }}>{children}</main>
      </div>
    </div>
  );
}