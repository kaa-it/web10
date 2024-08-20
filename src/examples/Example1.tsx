import React, { ReactElement, ReactNode } from "react"

//child
interface ChildProps {
  text: string
}

function Child({ text }: ChildProps): ReactElement {
  return <p>{text}</p>
}

// parent
interface ParentProps {
  children: ReactNode
}

function Parent({ children }: ParentProps) {
  return <div>
    {children}
  </div>
}

// use case
function Example1() {
  return (
    <Parent>
      <Child text="Hello" />
    </Parent>
  )
}