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
  header: ReactNode,
  content: ReactNode
}

function Parent({ header, content }: ParentProps) {
  return <div>
    <header>{header}</header>
    <main>{content}</main>
  </div>
}

// use case
function Example2() {
  return (
    <Parent
      header={<Child text="header" />}
      content={<Child text="content" />}
    />
  )
}