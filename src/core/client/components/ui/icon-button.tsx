export type IconButtonProps = {
  onClick: () => void
  icon: React.ReactNode
  className?: string
}
export const IconButton = ({
  onClick,
  icon,
  className = '',
}: IconButtonProps) => (
  <button className={`cursor-pointer ${className}`} onClick={onClick}>
    {icon}
  </button>
)
