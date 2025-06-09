"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addMonths } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar"

function MonthSelection({ selectedMonth }) {
  const today = new Date();
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);

  // Pass the default month to parent on component mount
  useEffect(() => {
    if (selectedMonth) {
      selectedMonth(nextMonth);
    }
  }, []);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="flex gap-2 items-center text-slate-500 cursor-pointer"
            variant={"outline"}
          >
            <CalendarDaysIcon className="h-5 w-5" />
            {moment(month).format("MMM yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar 
            mode="single" 
            className="flex flex-1 justify-center"
            month={month}
            onMonthChange={(value) => {selectedMonth && selectedMonth(value); setMonth(value);}}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MonthSelection;
