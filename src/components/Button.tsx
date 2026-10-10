import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const buttonVariants = cva("text-black hover:cursor-pointer", {
  variants: {
    variant: {
      primary: "bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500",
      secondary: "bg-slate-400 hover:bg-slate-300 active:bg-slate-500",
      neutral: "bg-slate-300 hover:bg-slate-200 active:bg-slate-500",
      success: "bg-green-400 hover:bg-green-300 active:bg-green-500",
      // bare button for icons, no box styling
      icon: "",
    },
  },
  compoundVariants: [
    {
      variant: ["primary", "secondary", "neutral", "success"],
      className:
        "p-2 border-2 border-black shadow-[2px_2px_rgba(0,0,0,0.75)] transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
    },
  ],
  defaultVariants: {
    variant: "primary",
  },
});

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export default function Button({ variant, className, ...props }: Props) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}
