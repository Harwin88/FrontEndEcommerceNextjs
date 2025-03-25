import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleGridItemSkeleton = () => (
  <div className="p-4 border rounded-lg shadow-md">
    <Skeleton height={200} />
    <Skeleton width="80%" height={20} className="mt-2" />
    <Skeleton width="60%" height={20} className="mt-2" />
    <Skeleton width="40%" height={20} className="mt-2" />
  </div>
);

const SingleListItemSkeleton = () => (
  <div className="flex p-4 border rounded-lg shadow-md">
    <Skeleton width={100} height={100} />
    <div className="ml-4 flex-1">
      <Skeleton width="80%" height={20} />
      <Skeleton width="60%" height={20} className="mt-2" />
      <Skeleton width="40%" height={20} className="mt-2" />
    </div>
  </div>
);

export { SingleGridItemSkeleton, SingleListItemSkeleton };
