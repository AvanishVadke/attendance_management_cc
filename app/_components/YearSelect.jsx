"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_services/GlobalApi'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function YearSelect({ value, onChange, label = "Select Year", placeholder = "Select year..." }) {
  const [years, setYears] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchYears = async () => {
      setLoading(true)
      try {
        const res = await GlobalApi.GetAllYears()
        const uniqueYears = [...new Set(res.data.map((item) => item.year))]
        setYears(uniqueYears)
      } catch (error) {
        // Optionally handle error
      } finally {
        setLoading(false)
      }
    }
    fetchYears()
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <Select value={value} onValueChange={onChange} disabled={loading}>
        <SelectTrigger >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {years.length === 0 ? (
              <SelectItem value="no-years" disabled>No years found</SelectItem>
            ) : (
              years.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default YearSelect