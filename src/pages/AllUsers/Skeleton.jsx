import React from "react"
import ContentLoader from "react-content-loader"

export const UsersSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={800}
    viewBox="0 0 400 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#ffffff"
    {...props}
  >
    <circle cx="160" cy="132" r="80" /> 
    <rect x="75" y="240" rx="0" ry="0" width="171" height="32" />
    
  </ContentLoader>
)

