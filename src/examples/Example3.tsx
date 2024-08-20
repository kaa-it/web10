import React, { ReactElement, ReactNode } from "react"

//child
interface ChildProps {
  text: string;
  className?: string;
}

function Child({ text }: ChildProps): ReactElement {
  return <p>{text}</p>
}

// parent
interface ChildCallbackProps {
  className: string
}

interface ParentProps {
  children: (props: ChildCallbackProps) => ReactNode
}

function Parent({ children }: ParentProps) {
  return <div>
    {children({ className: 'child' })}
  </div>
}

// use case
function Example3() {
  return (
    <Parent>
      {({ className }) => <Child text="Hello" className={className} />}
    </Parent>
  )
}