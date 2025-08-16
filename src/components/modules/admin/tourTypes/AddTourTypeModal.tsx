import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAddTourTypeMutation } from "@/redux/features/Tour/tour.api"
import { useForm } from "react-hook-form"
import { toast } from "sonner"


const AddTourTypeModal = () => {
    const form = useForm();

    const [AddTourType] = useAddTourTypeMutation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        const res = await AddTourType(data).unwrap();
        if(res.success){
            toast.success("Tour type added successfylly")
        }
    }

    return (
        <div>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add Tour Type</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Tour Type</DialogTitle>

                        </DialogHeader>
                        <Form {...form}>
                            <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)} >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tour Type Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Tour Type Name"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" form="add-tour-type">Add</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>

        </div>
    )
}

export default AddTourTypeModal