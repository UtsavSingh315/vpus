"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  const { title, Department, price, Units } = Object.fromEntries(formData);

  try {
    // Ensure database is connected
    await connectToDB();

    const newProduct = new Product({
      title,
      Department,
      price,
      Units,
    });

    // Save the product
    await newProduct.save();

    
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }
  // Revalidate and redirect to the correct path
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

// Update a product
export const updateProduct = async (formData) => {
  const { id, title, Department, price, Units } = Object.fromEntries(formData);

  try {
    // Ensure database is connected
    await connectToDB();

    // Update only fields that are provided (non-empty)
    const updateFields = {
      title,
      Department,
      price,
      Units,
    };

    // Remove undefined or empty fields
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );

    // Update product in the database
    await Product.findByIdAndUpdate(id, updateFields);
    
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }
  
      // Revalidate and redirect to the correct path
      revalidatePath("/dashboard/products");
      redirect("/dashboard/products");
};

// Delete a user
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    // Ensure database is connected
    await connectToDB();

    // Delete user by ID
    await User.findByIdAndDelete(id);

    // Revalidate after deletion
    revalidatePath("/dashboard/products");

  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
