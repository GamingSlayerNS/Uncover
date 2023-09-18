import React, { MouseEventHandler } from 'react'

type Props = {
  onClick: MouseEventHandler,
  text: string,
}

const Button = ({ onClick, text }: Props) => (
  <button className="mx-auto px-2 shadow-lg bg-secondary" onClick={onClick}>
    {text}
  </button>
)

export default Button