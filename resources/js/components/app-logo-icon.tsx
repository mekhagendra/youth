export default function AppLogoIcon({ className }: { className?: string }) {
    return (
        <img 
            src="/images/youthlogo.png" 
            alt="Youth Initiative" 
            className={className || "h-9 w-9"}
        />
    );
}
