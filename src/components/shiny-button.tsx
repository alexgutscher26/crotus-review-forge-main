import { cn } from "@/utils"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  to?: string;
  className?: string;
}

export const ShinyButton = ({
  className,
  children,
  to = "/",
  ...props
}: ShinyButtonProps) => {
  return (
    <Link to={to} className="inline-block">
      <button
        className={cn(
          "group relative flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white bg-green-600 px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-green-700 focus:outline-none hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] hover:ring-2 hover:ring-green-500/50",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" />
        </span>

        <div className="ease-[cubic-bezier(0.19,1,0.22,1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]"/>
      </button>
    </Link>
  )
}