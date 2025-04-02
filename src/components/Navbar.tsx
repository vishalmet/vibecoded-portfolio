import {
    Activity,
    Component,
    HomeIcon,
    Mail,
    Package,
    ScrollText,
    SunMoon,
  } from 'lucide-react';
  
  import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
  
  const data = [
    {
      title: 'Home',
      icon: (
        <HomeIcon className='h-full w-full text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Products',
      icon: (
        <Package className='h-full w-full text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Components',
      icon: (
        <Component className='h-full w-full text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Activity',
      icon: (
        <Activity className='h-full w-full text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Change Log',
      icon: (
        <ScrollText className='h-full w-full text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Email',
      icon: (
        <Mail className='h-full w-full text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Theme',
      icon: (
        <SunMoon className='h-full w-full text-neutral-300' />
      ),
      href: '#',
    },
  ];
  
  export function Navbar() {
    return (
      <div className=' fixed bottom-2 left-1/2 max-w-full -translate-x-1/2 z-50'>
        <Dock className='items-end pb-3  bg-gradient-to-r from-amber-500/10 via-black to-amber-500/10 backdrop-blur-[2px] border-2 border-white/[0.15]'>
          {data.map((item, idx) => (
            <DockItem
              key={idx}
              className='aspect-square rounded-full bg-amber-500/10'
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    );
  }
  