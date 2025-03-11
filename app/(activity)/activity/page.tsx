"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useAuth } from "../../../lib/useAuth";
import { CheckCircle2, Trash2, Circle } from 'lucide-react';
import { useRouter } from "next/navigation";



interface Activity {
  _id: string;
  activity: string;
  createdAt: Date;
  userId: string;
}

interface Task {
  _id: string;
  task: string;
  dueDate: string;
  isDone: boolean;
  userId: string;
}

const ActivityPage = () => {
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [newActivity, setNewActivity] = useState("");
  const [toDoList, setToDoList] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userId, setUserId] = useState<string | null>(null); // Store userId in state

  // Fetch userId from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user");
      setUserId(storedUserId);
    }
  }, []);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("user");

      if (!loading && (!token || !storedUserId)) {
        router.push("/auth/signin");
      }
    }
  }, [user, loading, router]);

  // Fetch activities and tasks on mount
  useEffect(() => {
    if (userId) {
      fetchActivities();
      fetchTasks();
    }
  }, [userId]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/activity?userId=${userId}`);
      setRecentActivities(response.data);
    } catch (error) {
      console.log("Error fetching activities:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/todo?userId=${userId}`);
      setToDoList(response.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const addRecentActivity = async () => {
    if (!newActivity.trim() || !userId) return;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/activity`, {
        activity: newActivity,
        userId: userId,
      });

      setRecentActivities([...recentActivities, response.data.data]);
      setNewActivity("");
    } catch (error) {
      console.log("Error adding activity:", error);
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_APIURL}/activity/${id}`, {
        data: { userId },
      });
      setRecentActivities((prev) => prev.filter((activity) => activity._id !== id));
    } catch (error) {
      console.log("Error deleting activity:", error);
    }
  };

  const addToDo = async () => {
    if (!newTask.trim() || !newDueDate || !userId) return;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/todo`, {
        task: newTask,
        dueDate: newDueDate,
        userId: userId,
      });

      setToDoList([...toDoList, response.data.data]);
      setNewTask("");
      setNewDueDate("");
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_APIURL}/todo/${id}`, {
        data: { userId },
      });
      setToDoList((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const toggleTaskStatus = async (id: string) => {
    try {
      const currentTask = toDoList.find((t) => t._id === id);
      if (!currentTask) return;

      // Optimistic update
      setToDoList((prev) =>
        prev.map((t) => (t._id === id ? { ...t, isDone: !t.isDone } : t))
      );

      await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/todo/${id}/status`, {
        isDone: !currentTask.isDone,
        userId,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      // Rollback on error
      setToDoList((prev) =>
        prev.map((t) => (t._id === id ? { ...t, isDone: !t.isDone } : t))
      );
    }
  };

  function cn(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className=" bg-gray-100 p-4 mt-[130px]">
      <div className="bg-white rounded-md py-7 mx-auto px-3 lg:px-16">
        <h1 className="text-3xl text-eweko_green_dark font-bold mb-4 text-center border-b border-eweko_green_light pb-3">
          Activity & To-Do List
        </h1>

        <div className="grid  grid-cols-1 md:grid-cols-2 gap-20">
          {/* Recent Activities Section */}
          <div className="max-h-screen ">
            <h2 className="  text-xl lg:text-2xl font-semibold text-eweko_green_dark mb-4">Recent Activities</h2>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Enter new activity"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                className="w-full mb-2 h-[50px]"
              />
              <Button className="bg-eweko_green_dark" variant="default" onClick={addRecentActivity}>
                Add Activity
              </Button>
            </div>
            <ul className="space-y-2    h-auto max-h-[500px] overflow-y-auto">
              {recentActivities.map((activity) => (
                <li
                  key={activity._id}
                  className="p-4 bg-white shadow rounded  hover:bg-eweko_green/60 hover:text-white  border-b flex justify-between items-center"
                >
                  <span className='flex flex-col  lg:flex-row lg:gap-10'>
                  <span className="text-eweko_green_dark">{activity.activity}</span>
                  <span className=" text-ssm lg:text-md text-gray-500 ">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                  </span>
                  <Button
        variant="ghost"
        size="lg"
                    onClick={() => deleteActivity(activity._id)}
                    className="text-red-500 hover:bg-red-50"

                  >
                <Trash2 className="w-6 h-6" />
        </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* To-Do List Section */}
          <div className="max-h-screen ">
            <h2 className=" text-xl lg:text-2xl font-semibold mb-4">To-Do List</h2>
            <div className="mb-4 ">
              <Input
                type="text"
                placeholder="Enter new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full mb-2 h-[50px]"
              />
              <Input
                type="datetime-local"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-full mb-2 h-[50px]"
              />
              <Button className="bg-eweko_green_dark" variant="default" onClick={addToDo}>
                Add Task
              </Button>
            </div>
            <ul className="space-y-2 max-h-[450px] overflow-y-auto">
  {toDoList.map((task) => (
    <li
      key={task._id}
      className="p-4 bg-white shadow border-b hover:bg-eweko_green/60 hover:text-white rounded flex justify-between items-center transition-all duration-200"
    >
      <div className="flex items-center gap-2 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleTaskStatus(task._id)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          {task.isDone ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300" />
          )}
        </Button>
        <span className="flex flex-col lg:flex-row">
        <span className={cn(
          "flex-1",
          task.isDone && "line-through text-gray-400 flex flex-col lg:flex-row lg:gap-10"
        )}>
          {task.task}
          <span className="ml-2 text-sm lg:text-md text-gray-500">
            (Due: {new Date(task.dueDate).toLocaleString()})
          </span>
        </span>
        </span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteTask(task._id)}
        className="text-red-500 hover:bg-red-50"
      >
        <Trash2 className="w-6 h-6" />
      </Button>
    </li>
  ))}
</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;