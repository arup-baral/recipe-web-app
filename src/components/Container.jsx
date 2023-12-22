function Container({children, className = "", ...props}) {
  return (
    <div className={`w-full h-fit flex ${className}`} {...props}>{children}</div>
  )
}

export default Container;