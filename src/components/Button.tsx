import { ButtonHTMLAttributes } from "react";

const Button = ({
  text,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { text: string }) => (
  <button type="button" {...props}>
    {text}
  </button>
);
export default Button;
