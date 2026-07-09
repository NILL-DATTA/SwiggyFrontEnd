import Header from "@/components/restaurantHeader/header";
import Sidebar from "@/components/restaurantSidebar/sidebar";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-[#FAF7F2] flex overflow-hidden">

      <aside className="w-72 shrink-0 border-r border-[#ECE4D9] bg-[#1D2220]">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}