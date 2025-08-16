import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import AddTourTypeModal from "@/components/modules/admin/tourTypes/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useGetTourTypesQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AddTourType = () => {
    const { data, isLoading } = useGetTourTypesQuery(undefined);
    const [removeTourType] = useRemoveTourTypeMutation()

    const handleRemoveTourType = async(tourId:string)=>{
        const toastId = toast.loading("deleting tour type....")
        try {
            const res = await removeTourType(tourId).unwrap();
            if(res.success){
                toast.success("Tour type deleted successfully",{id:toastId})
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-4 p-4">
            <div className="flex justify-between my-8">
                <h2 className="text-lg font-semibold tracking-tight">Tour Types</h2>
                <AddTourTypeModal></AddTourTypeModal>

            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tour Name</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center py-6 text-muted-foreground">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : data?.length ? (
                            data.map((item: {_id:string, name: string }, index: number) => (
                                <TableRow
                                    key={index}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-right">
                                        <DeleteConfirmation onConfirm={()=>handleRemoveTourType(item._id)}>
                                            <Button size="sm">
                                                <Trash2 />
                                            </Button>
                                        </DeleteConfirmation>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center py-6 text-muted-foreground">
                                    No tour types found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AddTourType;
