import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from './link'
import ThemeToggle from './theme-toggle'
import { NAV_LINKS, SITE } from '../../consts'
import { cn } from '@/lib/utils'
import debounce from 'lodash.debounce'
import Logo from '../ui/logo'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { Separator } from '../ui/separator'

const Navbar = () => {
  const [scrollLevel, setScrollLevel] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePath, setActivePath] = useState("/")
  
  useEffect(() => {
    setActivePath(window.location.pathname)
    
    const handleRouteChange = () => {
      setActivePath(window.location.pathname)
    }
    
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])
  
  useEffect(() => {
    const handleResize = debounce(() => {
      const isMobileView = window.matchMedia('(max-width: 768px)').matches
      setIsMobile(isMobileView)
      if (!isMobileView && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }, 100)

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollY = window.scrollY
      setScrollLevel(
        scrollY > 500 ? 4 : scrollY > 300 ? 3 : scrollY > 150 ? 2 : scrollY > 0 ? 1 : 0
      )
      setIsScrolled(scrollY > 0)
    }, 50)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const sizeVariants: Record<number, { width: string }> = {
    0: { width: '100%' },
    1: { width: '90%' },
    2: { width: '80%' },
    3: { width: '70%' },
    4: { width: '50%' },
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  }

  return (
    <>
      <motion.header
        aria-label="Navigation"
        role="navigation"
        layout={!isMobile}
        initial={sizeVariants[0]}
        animate={isMobile ? sizeVariants[0] : sizeVariants[scrollLevel]}
        className={cn(
          'fixed left-1/2 z-30 -translate-x-1/2 transform backdrop-blur-lg',
          'bg-background/80 border-0',
          'rounded-none shadow-none transition-all duration-300 ease-in-out',
          'border border-transparent w-full',
          isScrolled && !isMobile && 'rounded-full',
          isScrolled && !isMobile && 'backdrop-blur-md',
          isScrolled && !isMobile && 'border-foreground/10',
          isScrolled && !isMobile && 'border',
          isScrolled && !isMobile && 'bg-background/80',
          isScrolled && !isMobile && 'max-w-[calc(100vw-5rem)]',
          !isMobile && 'top-2 lg:top-4 xl:top-6',
          isMobile && 'top-0',
          isMobile && 'rounded-none',
          isMobile && 'border-0',
          isMobile && 'shadow-none',
          isMobile && 'border-0'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">
          <Link
            href="/"
            className="font-custom flex shrink-0 items-center gap-2 text-xl font-bold"
            aria-label="Home"
            title="Home"
            navigation="true"
          >
            {/* <Logo className="h-8 w-8" /> */}
            <span className={
              'transition-opacity duration-200 ease-in-out text-foreground/90 dark:text-white'}>
              {SITE.title}
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation" role="navigation">
              {NAV_LINKS.map((item) => {
                const isActive = activePath.startsWith(item.href) && item.href !== "/";
                return (
                  <motion.div
                    key={item.href}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium capitalize transition-colors duration-200",
                        "relative py-1 px-1",
                        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300",
                        "hover:after:w-full hover:text-foreground",
                        isActive 
                          ? "text-foreground after:w-full after:bg-primary" 
                          : "text-foreground/70"
                      )}
                      onClick={() => setActivePath(item.href)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <ThemeToggle />
            
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className={
                  "ml-1 h-9 w-9 rounded-full p-0 transition-colors duration-200 ease-in-out"
                }
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-20 flex flex-col items-center justify-start bg-background border-0 shadow-none"
          >
            <div className="flex flex-col items-center justify-start h-full pt-24 w-full p-6">
              <nav className="flex flex-col items-center justify-start gap-1 w-full">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    className="w-full text-start"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="dark:text-white text-lg font-bold font-custom capitalize dark:hover:text-white/80 transition-colors inline-block py-2 relative group"
                    >
                      {item.label}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-neutral-900 dark:bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div
                custom={NAV_LINKS.length + 1}
                className="mt-auto flex flex-col items-center gap-6"
              >
                <div className="flex flex-wrap items-center justify-center gap-x-2 text-center">
                  <span className="text-muted-foreground text-sm" aria-label="copyright">
                    2020 - {new Date().getFullYear()} &copy; All rights reserved.
                  </span>
                  <Separator orientation="vertical" className="hidden h-4! sm:block" />
                  <p className="text-muted-foreground text-sm" aria-label="open-source description">
                    <Link
                      href="https://github.com/cojocaru-david/portfolio"
                      class="text-foreground"
                      external
                      underline>Open-source</Link
                    > under MIT license
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar