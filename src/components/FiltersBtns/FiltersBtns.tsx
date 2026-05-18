import React from 'react'
import { Input } from '../ui/input'

const FiltersBtns = ({ table, columnId }: { table: any, columnId: string }) => {
    
    return (
        <>
            {/* Fitlerations */}
            <div  className="flex items-center py-4" >
                <Input
                    placeholder="Search"
                    value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(columnId)?.setFilterValue(event.target.value)
                    }
                    className="max-w-3xs p-3 focus-visible:ring-sidebar-accent shadow-2xl"
                />
            </div >
        </>
    )
}

export default FiltersBtns