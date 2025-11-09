import type { ReactNode } from "react";

export default function SignUpLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-purple-600 dark:bg-purple-700">
      {children}
    </div>
  );
}
