import { Button as BootstrapButton } from 'react-bootstrap'

function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <BootstrapButton variant={variant} className={className} {...props}>
      {children}
    </BootstrapButton>
  )
}

export default Button
