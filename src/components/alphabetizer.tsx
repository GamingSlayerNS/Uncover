import React, { MouseEventHandler } from 'react'

type Props = {
  onClick: MouseEventHandler,
  text: string,
}

const Button = ({ onClick, text }: Props) => (
  <button onClick={onClick} className="bg-green-400">
    {text}
  </button>
)

export default Button