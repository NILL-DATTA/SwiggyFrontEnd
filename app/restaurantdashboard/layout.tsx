import RestaurantLayout from "../../components/restaurantLayout/restaurantLayout";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RestaurantLayout>{children}</RestaurantLayout>;

}