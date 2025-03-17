import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const SkeletonLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
        {/* Skeleton del Header */}
        <div className="w-full bg-white shadow-md p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Skeleton height={30} width={120} />
            <Skeleton height={40} width="40%" />
            <div className="flex space-x-4">
              <Skeleton circle height={30} width={30} />
              <Skeleton circle height={30} width={30} />
              <Skeleton circle height={30} width={30} />
            </div>
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="flex max-w-7xl mx-auto mt-6 px-4">
          {/* Sección izquierda (Banner) */}
          <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
            <Skeleton height={50} width="30%" className="mb-2" />
            <Skeleton height={30} width="50%" className="mb-4" />
            <Skeleton height={20} width="80%" className="mb-2" />
            <Skeleton height={20} width="90%" className="mb-2" />
            <Skeleton height={20} width="70%" className="mb-4" />
            <Skeleton height={40} width={140} className="rounded-md" />
            <Skeleton height={300} width="100%" className="mt-4 rounded-lg" />
          </div>

          {/* Sección derecha (Ofertas) */}
          <div className="w-1/3 space-y-4 pl-4">
            {[1, 2].map((_, i) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow-md">
                <Skeleton height={120} width="100%" className="mb-2" />
                <Skeleton height={20} width="80%" className="mb-1" />
                <Skeleton height={15} width="60%" className="mb-1" />
                <Skeleton height={20} width="40%" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 w-full bg-white p-4">
          <Skeleton height={80} width="100%" />
        </div>
      </div>);
};

export default SkeletonLayout;