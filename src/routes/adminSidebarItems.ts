import AddTour from "@/pages/Admin/AddTour";
import type { ISidebarItem } from "@/types";


export const adminSidebarItems:ISidebarItem[] = [
    {
        title: "Dashboard",
       
        items: [
            
            {
                title: "Add Tour",
                url: "/admin/add-tour",
                component:AddTour
            },
        ],
    }

]