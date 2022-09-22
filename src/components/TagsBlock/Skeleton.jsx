import React from 'react'
import ContentLoader from 'react-content-loader';
import { SideBlock } from "../SideBlock";

export const TagsSkeleton = props => (
    <ContentLoader
      speed={2}
      width={400}
      height={300}
      viewBox="0 0 400 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    > 
      {/* + 60 */}
      {/* Название тэга */}
      <rect x="65" y="10" rx="6" width="70%" height="40" />
      <rect x="65" y="70" rx="6" width="280" height="40" />
      <rect x="65" y="130" rx="6" width="280" height="40" />
      <rect x="65" y="190" rx="6" width="280" height="40" />
      <rect x="65" y="250" rx="6" width="280" height="40" />

      {/* Знак тэга */}
      <rect x="20" y="10" rx="6" width="30" height="40" />
      <rect x="20" y="70" rx="6" width="30" height="40" />
      <rect x="20" y="130" rx="6" width="30" height="40" />
      <rect x="20" y="190" rx="6" width="30" height="40" />
      <rect x="20" y="250" rx="6" width="30" height="40" />
    </ContentLoader>
)
