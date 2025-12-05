import React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse p-4 rounded-lg glass">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
    </div>
  );
};

export default Skeleton;