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
      className="relative w-full flex-1 overflow-hidden bg-amber-100 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"
    >
      {children}
    </main>
  );
}
