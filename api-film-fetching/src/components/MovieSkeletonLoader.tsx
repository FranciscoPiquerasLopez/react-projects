export default function MovieSkeletonLoader({ 'data-testid': testId }: { 'data-testid'?: string }) {
    return (
        <div
            data-testid={testId}
            className="relative animate-pulse max-w-[250px] rounded-lg overflow-hidden bg-neutral-800"
            aria-busy="true"
            role="status"
        >
            <div className="h-[375px] bg-neutral-700 rounded"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 bg-neutral-600 rounded"></div>
                <div className="h-3 w-1/2 bg-neutral-600 rounded"></div>
                <div className="h-8 w-full bg-neutral-700 rounded"></div>
            </div>
        </div>
    );
};