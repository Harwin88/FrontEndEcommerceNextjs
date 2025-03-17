import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AccordionSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 1}).map((_, index) => (
        <div key={index} >
          {/* Título del acordeón */}
          <Skeleton height={20} width="60%" />
          {/* Simulación de items dentro del acordeón */}
          <div className="mt-2 space-y-2">
            <Skeleton height={15} width="90%" />
            <Skeleton height={15} width="80%" />
            <Skeleton height={15} width="70%" />
          </div>
        </div>
      ))}
    </div>
  );
}
