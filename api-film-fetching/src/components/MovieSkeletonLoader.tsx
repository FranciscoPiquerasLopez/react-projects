export default function MovieSkeletonLoader() {
    return (
        <div className="relative animate-pulse max-w-[250px] rounded-lg overflow-hidden bg-neutral-800">
            <div className="h-[375px] bg-neutral-700 rounded"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 bg-neutral-600 rounded"></div>
                <div className="h-3 w-1/2 bg-neutral-600 rounded"></div>
                <div className="h-8 w-full bg-neutral-700 rounded"></div>
            </div>
        </div>
    );
};