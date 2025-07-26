import { Plus, Users, History, BarChart3 } from "lucide-react";
// import { Link } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function QuickActions() {
  const actions = [
    {
      icon: <Plus className="w-8 h-8 text-red-500" />,
      label: "New Game",
      className:
        "w-full h-24 flex-col gap-3 bg-white border-2 border-dashed border-gray-300 hover:border-red-300 hover:bg-red-50",
      link: "/dev/auth/game/create",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      label: "Manage Players",
      className: "w-full h-24 flex-col gap-3 bg-white hover:bg-blue-50",
      link: "/dev/auth/game/player",
    },
    {
      icon: <History className="w-6 h-6 text-purple-500" />,
      label: "Game History",
      className: "w-full h-20 flex-col gap-2 bg-white hover:bg-purple-50",
      link: "/dev/auth/game/history",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      label: "Analytics",
      className: "w-full h-20 flex-col gap-2 bg-white hover:bg-green-50",
      link: "/dev/auth/game/analytics",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {actions.slice(0, 2).map((action, idx) => (
          <Link href={action.link} key={action.label} className="d-inline">
            <Button
              key={action.label}
              variant="outline"
              className={action.className}
              // onClick={action.onClick}
            >
              {action.icon}
              <span className="font-medium">{action.label}</span>
            </Button>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {actions.slice(2).map((action, idx) => (
          <Link href={action.link} key={action.label} className="d-inline">
            <Button
              key={action.label}
              variant="outline"
              className={action.className}
              // onClick={action.onClick}
            >
              {action.icon}
              <span className="font-medium">{action.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
}
