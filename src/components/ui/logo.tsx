import { cn } from "@/lib/utils"

function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 350 266"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-full h-auto text-neutral-900 dark:text-neutral-100 transition-colors duration-300",
        className
      )}
      role="img"
      aria-label="Logo"
      aria-hidden="true"  
      focusable="false"
    >
      <path
        d="M0 0h216.667C290.305 0 350 59.546 350 133s-59.695 133-133.333 133L0 0zm231.629 231.641c48.131-7.203 85.038-48.623 85.038-98.641 0-55.09-44.772-99.75-100-99.75h-54.862C185.557 59.722 200 94.678 200 133c0 17.331-2.96 33.991-8.405 49.492l40.034 49.149zm-66.243-81.326c.844-5.646 1.281-11.428 1.281-17.315 0-42.333-22.66-79.386-56.541-99.75H70.032l95.354 117.065z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default Logo
