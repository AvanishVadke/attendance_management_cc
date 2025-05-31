import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_services/GlobalApi'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function DivisionSelect({ value, onChange, placeholder = "Select division...", year }) {
  const [divisions, setDivisions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!year) {
      setDivisions([])
      return
    }
    const fetchDivisions = async () => {
      setLoading(true)
      try {
        const res = await GlobalApi.GetAllYears()
        // Filter by selected year, then dedupe divisions
        const filtered = res.data.filter((item) => item.year === year)
        const uniqueDivisions = [...new Set(filtered.map((item) => item.division))]
        setDivisions(uniqueDivisions)
      } catch (error) {
        // Optionally handle error
      } finally {
        setLoading(false)
      }
    }
    fetchDivisions()
  }, [year])

  return (
    <div className="flex flex-col gap-2">
      <Select value={value} onValueChange={onChange} disabled={loading || !year}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {(!year || divisions.length === 0) ? (
              <SelectItem value="no-divisions" disabled>No divisions found</SelectItem>
            ) : (
              divisions.map((division) => (
                <SelectItem key={division} value={division}>{division}</SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default DivisionSelect