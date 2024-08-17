import { ButtonHTMLAttributes } from "react";

const Button = ({
  text,
  type,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { text: string }) => (
  <button type={type} {...props}>
    {text}
  </button>
);
export default Button;
