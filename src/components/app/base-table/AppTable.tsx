"use client"
import { columns, type AppTable } from "./Columns"
import { DataTable } from "./data-table"

import { useState, useEffect } from "react"

const getData = async (): Promise<AppTable[]> => {
    // return [
    //     {
    //         id: 1,
    //         title: "Hero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Hero",
    //         description: "test",
    //         status: "desactive"
    //     },
    //     {
    //         id: 1,
    //         title: "Hero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Oero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Sero",
    //         description: "test",
    //         status: "desactive"
    //     },
    //     {
    //         id: 1,
    //         title: "Dero",
    //         description: "test",
    //         status: "desactive"
    //     },
    //     {
    //         id: 1,
    //         title: "Kero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Aero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Zero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Hero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Hero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Hero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Hero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Hero",
    //         description: "test",
    //         status: "active"
    //     },
    //     {
    //         id: 1,
    //         title: "Hero",
    //         description: "test",
    //         status: "active"
    //     },
    // ]
}

const AppTable = () => {
    const [data, setData] = useState<AppTable[]>([])
    
    useEffect(() => {
        getData().then(setData)
    }, [])

    return (
        <div>

            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default AppTable