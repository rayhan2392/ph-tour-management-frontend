import SingleImageUploader from "@/components/SingleImageUploader"
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
import { useAddDivisionMutation } from "@/redux/features/division/division.api"
import { useState } from "react"

import { useForm } from "react-hook-form"
import { toast } from "sonner"



const AddDivisionModal = () => {
    const form = useForm();
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState<File | null>(null);
    const [addDivision] = useAddDivisionMutation();

    console.log("Inside add division file", image)



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        const toastId = toast.loading("division adding in pregress....")
        const formData = new FormData()
        formData.append("data", JSON.stringify(data))
        formData.append("file", image as File)

        try {

            const res = await addDivision(formData).unwrap();
            if (res.success) {
                toast.success("Division added successfully", { id: toastId })
                setOpen(false)
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen} >
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add Division</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Division</DialogTitle>

                        </DialogHeader>
                        <Form {...form}>
                            <form className="space-y-5" id="add-division" onSubmit={form.handleSubmit(onSubmit)} >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Division Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Division"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="description"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </form>
                            <SingleImageUploader onChange={setImage}></SingleImageUploader>
                        </Form>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" form="add-division">Add</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>

        </div>
    )
}

export default AddDivisionModal