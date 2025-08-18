import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, } from "lucide-react"
import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api"
import { Link } from "react-router"

const Tours = () => {

    const { data: tours } = useGetAllToursQuery(undefined)

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">Available Tours</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tours?.map((tour) => (
                    <Card key={tour._id} className="overflow-hidden flex flex-col">
                        <div className="relative w-full h-48">
                            <img
                                src={tour.images[0]}
                                alt={tour.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <CardHeader>
                            <h2 className="text-xl font-semibold line-clamp-1">{tour.title}</h2>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {tour.description}
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                                <MapPin className="mr-2 h-4 w-4" />
                                {tour.location}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                {new Date(tour.startDate).toLocaleDateString()} - {" "}
                                {new Date(tour.endDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Users className="mr-2 h-4 w-4" /> Max {tour.maxGuest} Guests
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between mt-auto">
                            <span className="font-bold text-primary">From ৳{tour.costFrom}</span>
                            <Link to={`/tours/${tour._id}`}>
                                <Button>View Details</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Tours