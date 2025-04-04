import { loadUserFeed } from "@/actions/user-feed";
import Feed from "@/components/home/feed";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async  function Home() {
  const response = await loadUserFeed();

  return (
    <ProtectedRoute>
      <div className="max-h-screen w-full flex flex-col">
        <Feed data={response} />
      </div>
    </ProtectedRoute>
  );
}
