import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";

type ButtonProps = {
    direction: "left" | "right";
    onClick: () => void;
    disabled: boolean;
    ariaLabel: string;
};

export default function Buttons({
    direction,
    onClick,
    disabled,
    ariaLabel,
}: ButtonProps) {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            disabled={disabled}
            className={`absolute ${direction === "left" ? "left-1" : "right-1"} 
                        top-[55%] -translate-y-1/2 z-20 font-bold 
                        bg-black/50 text-white px-4 py-2 rounded-full 
                        backdrop-blur-sm shadow-2xl 
                        hover:bg-white hover:text-black hover:scale-110 
                        transition-all duration-200 
                        disabled:opacity-0 active:scale-95`}
        >
            <span aria-hidden="true">
                {direction === "left" ? (
                    <ArrowLeftIcon className="w-2 h-2 md:w-3 lg:w-6 lg:h-6" />
                ) : (
                    <ArrowRightIcon className="w-2 h-2 md:w-3  lg:w-6 lg:h-6" />
                )}
            </span>
        </button>
    );
}
