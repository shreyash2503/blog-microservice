import { loadUserFeed } from "@/actions/user-feed";
import Feed from "@/components/home/feed";
import Navbar from "@/components/home/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async  function Home() {
  const response = await loadUserFeed();

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="max-h-screen flex flex-col">
        <Feed data={response} />

      </div>
    </ProtectedRoute>
  );
}
