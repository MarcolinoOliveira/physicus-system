'use client'

import StudentsDataContext from "@/context/StudentsDataContext"
import { useContext } from "react"

const useStudents = () => useContext(StudentsDataContext)

export default useStudents