import { useDroppable } from "@dnd-kit/react";

export default function Canvas({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { ref } = useDroppable({
    id,
  });
  return (
    <main
      ref={ref}
      className="flex w-full flex-1 flex-col items-center justify-center gap-12 overflow-hidden bg-amber-100 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"
    >
      {children}
    </main>
  );
}
