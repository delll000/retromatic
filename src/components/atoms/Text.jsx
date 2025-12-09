import React from "react";
function Text({ children, as = "p", className }) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}

export default Text;
