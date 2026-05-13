import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Eye } from "lucide-react"

type ShowDialogProps = {
    title: string
}

const ShowDialog = ({ title }: ShowDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Eye /></Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ShowDialog