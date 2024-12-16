import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from ".."; // Import necessary components
import service from "../../appwrite/config"; // Adjusted to use your complaintService
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            unique_id: post?.unique_id || "",
            name: post?.name || "",
            email: post?.email || "",
            last_year_amount: post?.last_year_amount || "",
            this_year_amount: post?.this_year_amount || "",
            id: post?.$id || `post-${Date.now()}-${Math.floor(Math.random() * 10000)}`, // Generate random unique ID
        },
    });

    const navigate = useNavigate();

    const submit = async (data) => {
        try {
            // Convert 'last_year_amount' and 'this_year_amount' to integers
            data.last_year_amount = parseInt(data.last_year_amount, 10);
            data.this_year_amount = parseInt(data.this_year_amount, 10);

            // Check if the amounts are valid integers
            if (isNaN(data.last_year_amount) || isNaN(data.this_year_amount)) {
                throw new Error("Please enter valid numbers for amounts.");
            }

            let dbPost;

            if (post) {
                if (!post.$id) {
                    throw new Error("Post ID is not available");
                }
                dbPost = await service.updatePost(post.$id, { ...data });
            } else {
                dbPost = await service.createPost({ ...data });
            }

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Id :"
                    placeholder="id"
                    className="mb-4"
                    {...register("id", { required: true })}
                    readOnly // Make it read-only if you don't want users to modify the ID
                />
                <Input
                    label="unique_id:"
                    placeholder="unique_id"
                    className="mb-4"
                    {...register("unique_id", { required: true })}
                />
                <Input
                    label="name:"
                    placeholder="name"
                    className="mb-4"
                    {...register("name", { required: true })}
                />
                <Input
                    label="email:"
                    placeholder="email"
                    className="mb-4"
                    {...register("email", { required: true })}
                />
                <Input
                    label="last_year_amount:"
                    placeholder="last_year_amount"
                    className="mb-4"
                    {...register("last_year_amount", { required: true })}
                />
                <Input
                    label="this_year_amount:"
                    placeholder="this_year_amount"
                    className="mb-4"
                    {...register("this_year_amount", { required: true })}
                />
            </div>
            <div className="w-1/3 px-2">
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
