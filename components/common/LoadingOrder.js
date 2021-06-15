import React from "react";
import LoadingOverlay from 'react-loading-overlay'
import DotLoader from 'react-spinners/DotLoader'

export default function LoadingOrder({ active, children }) {
  return (
    <LoadingOverlay
      active={active}
      fadeSpeed={1000}
      spinner={<DotLoader color={"white"} size={150} css={{ position: "absolute", top: 200, right: 500 }} />}
    >
      {children}
    </LoadingOverlay>
  )
}
