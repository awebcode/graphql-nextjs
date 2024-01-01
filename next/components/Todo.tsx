"use client";
import React from "react";
import { getSingleTodo, getTodo } from "./query";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { ITodo, IGetTodo } from "@/interfaces/todoInterface";
import AddUser from "./AddUser";

const Todo = () => {
    const { data } = useSuspenseQuery<IGetTodo>(getTodo);
    const { data: singTodo } = useSuspenseQuery(getSingleTodo, {
        variables: {
            id:1
        }
    });
  // if (loading) {
  //     return <div className="animate-pulse text-white">Loading...</div>
  // }
  console.log(singTodo);

  return (
    <div>
      <h1 className="h1">Todo</h1>{" "}
      {/* {data?.getTodo?.map((todo: ITodo) => {
        return (
          <li key={todo.id} className="">
            {todo.title}
          </li>
        );
      })} */}
          
          <AddUser/>
    </div>
  );
};

export default Todo;
