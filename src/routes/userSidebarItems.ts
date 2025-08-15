import AddTour from "@/pages/Admin/AddTour";
import type { ISidebarItem } from "@/types";


export const userSidebarItems:ISidebarItem[] = [
    {
        title: "History",
       
        items: [
            
            {
                title: "Your Bookings",
                url: "/user/bookings",
                component:AddTour
            },
        ],
    }

]