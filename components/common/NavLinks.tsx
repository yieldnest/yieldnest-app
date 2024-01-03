import Link from 'next/link'

/**
 * NavLinks is a component that displays a list of navigation links.
 * Each link is defined by a title and a path.
 */
const NavLinks = () => {

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Docs', path: 'https://docs.yieldnest.finance/', target: '_blank' },
  ]

  return (
    <div>
      {/* On click menu drops down with a list of menu options */}
      {menuItems.length ?
        <ul className='flex flex-col ml-8 p-4 lg:flex-row lg:p-0 lg:gap-3'>
          {menuItems.map((item) => (
            <li className='mb-4 lg:mb-0' key={item.title}>
              <Link 
                href={item.path}
                aria-label={`Link to ${item.title} page`}
                className='py-1 text-xl text-foreground transition-colors hover:text-secondary lg:py-0'
                target={item.target ? item.target : ''}
              >
                {item.title}
              </Link>
            </li>
          ))}
          <li className='py-1 text-xl text-muted lg:py-0'>Portfolio
            <span className='text-xs'>(coming soon)</span></li>
        </ul>
        : null
      }
    </div>
  )
}

export default NavLinks
