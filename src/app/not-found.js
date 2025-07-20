import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound({ children }) {
return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl font-medium text-gray-600">Page Not Found</h2>
        <p className="mt-3 text-gray-500">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        {children}
        <div className="mt-8">
            <Button className="px-6 py-2" asChild>
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
    </div>
);
}
