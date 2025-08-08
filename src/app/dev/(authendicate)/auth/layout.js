import Header from "@/app/features/authen/header";
import { Toaster } from "@/components/ui/sonner"


const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
};

export default function authenticatedLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header />
      {children}
      <Toaster />
    </div>
  );
}
