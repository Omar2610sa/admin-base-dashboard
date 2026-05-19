import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import api from "@/APis/Axios"
import { CheckDelete } from "@/components/Alerts/CheckDelete"
import { SuccessAlert } from "@/components/Alerts/SuccessAlert"
import { UnSuccessAlert } from "@/components/Alerts/UnSuccessAlert"

interface TableActionsProps {
    to: string
    itemId: number | string
    itemName?: string
    endpoint?: string
    onDeleteSuccess?: () => void
}

const TableActions = ({ 
    to, 
    itemId, 
    itemName = "item",
    endpoint = "/dashboard/admin/sliders",
    onDeleteSuccess
}: TableActionsProps) => {
    const handleDelete = async () => {
        try {
            const result = await CheckDelete({ title: itemName })
            
            if (result.isConfirmed) {
                const response = await api.delete(`${endpoint}/${itemId}`)
                
                if (response.status === 200) {
                    SuccessAlert(`${itemName} deleted successfully`)
                    window.location.reload()
                    // Call callback if provided (to refresh table)
                    if (onDeleteSuccess) {
                        onDeleteSuccess()
                    }
                }
            }
        } catch (error) {
            console.error('Delete error:', error)
            UnSuccessAlert({ title: `Failed to delete ${itemName}` })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-center text-xs justify-center">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={to}>
                    <DropdownMenuItem className="justify-center">Edit</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    variant="destructive" 
                    className="p-1 justify-center cursor-pointer"
                    onClick={handleDelete}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TableActions