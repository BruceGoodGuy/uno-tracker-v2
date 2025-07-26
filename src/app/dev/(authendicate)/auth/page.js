import QuickActions from "@/app/features/authen/home/quick-actions";
import RecentGames from "@/app/features/authen/home/recent-games";
import ActiveGame from "@/app/features/authen/home/active-game";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      {/* Active Game Card */}
      <ActiveGame />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Games */}
      <RecentGames />
    </div>
  );
}
