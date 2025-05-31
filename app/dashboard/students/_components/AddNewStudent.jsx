"use client";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import React, { useState, useEffect } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

function AddNewStudent({ onStudentAdded }) {
  const [open, setOpen] = useState(false);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      year: "",
      division: "",
    },
  });

  useEffect(() => {
    GetAllYearsList();
  }, []);

  const GetAllYearsList = async () => {
    try {
      const res = await GlobalApi.GetAllYears();
      const uniqueYears = [...new Set(res.data.map((item) => item.year))];
      setYears(uniqueYears);
    } catch (error) {
      toast.error("Failed to load years data");
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);      const response = await GlobalApi.CreateStudent(data);
      toast.success("Student added successfully!");
      handleClose();
      if (onStudentAdded) onStudentAdded(); // Refresh the student list
      // You might want to trigger a refresh of the students list here
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to add student";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} className="cursor-pointer">
        <UserRoundPlus className="mr-2 h-4 w-4" /> Add new Student
      </Button>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Student</DialogTitle>
            <DialogDescription>
              Fill in the student details below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 py-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  placeholder="Ex. Example User"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">{errors.name.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Year</label>
                <Controller
                  name="year"
                  control={control}
                  rules={{ required: "Year is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select the Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Year</SelectLabel>
                            {years.map((year, index) => (
                              <SelectItem key={`${year}-${index}`} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {error && (
                        <span className="text-sm text-red-500">{error.message}</span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Division</label>
                <Controller
                  name="division"
                  control={control}
                  rules={{ required: "Division is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Division" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Division</SelectLabel>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {error && (
                        <span className="text-sm text-red-500">{error.message}</span>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="ghost"
                type="button"
                onClick={handleClose}
                className="cursor-pointer"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
