import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnauthenticatedLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 flex items-center">
        <Link href="/" className="flex items-center">
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>
      {/* Main Content */}
      {children}
    </div>
  );
}
