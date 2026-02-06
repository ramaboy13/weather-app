import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn("bg-white dark:bg-[#1E1F29] rounded-[2rem] p-6 shadow-sm transition-all", className)}
    >
      {children}
    </div>
  );
}
