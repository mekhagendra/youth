export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground bg-white">
        
                <img src="/images/youthlogo.png" alt="Youth Initiative" className="h-4 w-auto mb-0.5 bg-white"/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Youth Initiative 
                </span>
            </div>
        </>
    );
}
