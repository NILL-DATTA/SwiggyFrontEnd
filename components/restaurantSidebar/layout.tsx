import Sidebar from "./sidebar"

export default function RestaurantLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <Sidebar />

            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}