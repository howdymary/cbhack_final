import { cn } from "@/lib/utils"

interface ImageDisplayProps {
  src: string
  alt: string
  className?: string
}

export function ImageDisplay({ src, alt, className }: ImageDisplayProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg",
      className
    )}>
      <img 
        src={src} 
        alt={alt}
        className="object-cover w-full h-full"
        loading="lazy"
      />
    </div>
  )
}
