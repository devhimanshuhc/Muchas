import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: number;
  title: string;
  assignee: string;
}

export default function AssignedTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Has to deliver", assignee: "John Doe" },
    { id: 2, title: "Has to deliver", assignee: "Jane Doe" },
    { id: 3, title: "Has to deliver", assignee: "Jane Doe" },
    // Add more tasks as needed
  ]);

  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleViewDetails = (taskId: number) => {
    setSelectedTask((prev) => (prev === taskId ? null : taskId));
  };

  const { toast } = useToast();
  const handleDone = (taskId: number) => {
    // Update the task status to "Delivered"
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: "Delivered" } : task
      )
    );

    // Show toast notification
    toast({
      title: "Delivey completed!",
      description: "Task has been marked as delivered.",
    });
  };

  return (
    <div className="w-full max-w-[95%] lg:w-full mx-auto my-8 sm:w-[35%]">
      <div className="max-w-md mx-auto mt-8">
        <div className="rounded-lg overflow-hidden shadow-md">
          <div className="text-white p-4">
            <h2 className="text-2xl font-semibold">Tasks Assigned</h2>
          </div>
          <div className="p-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`mb-4 p-4 bg-white bg-opacity-10 rounded-md shadow-md flex flex-col items-start justify-between ${
                  selectedTask === task.id ? "transition-all max-h-96" : ""
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p>Assigned to: {task.assignee}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <Button
                    variant="outline"
                    className="px-5 py-1 mt-3 rounded-lg text-white transition-all ease-linear delay-75"
                    onClick={() => handleViewDetails(task.id)}
                  >
                    View Details
                  </Button>
                  {task.title === "Has to deliver" && (
                    <Button
                      variant="outline"
                      className="px-5 py-1 mt-3 rounded-lg text-white"
                      onClick={() => handleDone(task.id)}
                    >
                      Done
                    </Button>
                  )}
                </div>
                {selectedTask === task.id && (
                  <div className="mt-4 transition-all ease-in-out delay-75">
                    {/* Render task details here */}
                    <p>
                      Customer Name:{" "}
                      <span className="font-bold">John Smith</span>
                    </p>
                    <hr className="w-full h-1 border-white border-opacity-20 mt-2" />
                    <p>
                      Phone Number:{" "}
                      <span className="font-bold">+1234567890</span>
                    </p>
                    <hr className="w-full h-1 border-white border-opacity-20 mt-2" />

                    <p>
                      Customer Address:{" "}
                      <span className="font-bold">123 Main St, City</span>
                    </p>
                    <hr className="w-full h-1 border-white border-opacity-20 mt-2" />

                    <p>
                      Restaurant Address:{" "}
                      <span className="font-bold">456 Restaurant St, City</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
