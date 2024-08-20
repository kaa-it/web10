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
interface ParentProps {
  Item: React.ComponentType<ChildProps>;
}

function Parent({ Item, ...props }: ParentProps & ChildProps) {
  return <div>
    <Item {...props} className="child" />
  </div>
}

// use case
function Example4() {
  return (
    <Parent Item={Child} text="Hello" />
  )
}