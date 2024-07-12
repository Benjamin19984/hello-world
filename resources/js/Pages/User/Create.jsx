import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth }) {
    const { data, setData, post, errors, progress, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })

    const [formError, setFromError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const onSubmit = (e) => {
        e.preventDefault();
        
        // Initialize an object to track input errors
        let inputerror = {
            email : "",
            password : "",
            confirmPassword: "",
        }

        //
        if (!data.password && !data.email && !data.name) {
            setFromError(
                {
                    ...inputerror,
                    name: "Enter your name",
                    email: "Enter a valid email",
                    password: " Password should not be empty",
                }            
            )
            return        
        }
        if (data.password !== data.password_confirmation) {
            setFromError({
                ...inputerror,
                confirmPassword: "Password and Confirm Password should be the same."
            })
            return
        }
        if (!data.password) {
            setFromError({
                ...inputerror,
                password: "Password should not be empty."
            })
            return
        }
        setFromError(inputerror);
        post(route("user.store"));
    };
    
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create User</h2>
                    <Link href={route('user.create')} className='px-3 py-1 text-white rounded bg-emerald-500 shawdow hovor:bg-emerald-600'>Add new</Link>
                </div>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">                    
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                                onSubmit={onSubmit} encType="multipart/form-data">                               
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="User Name" />
                                    <TextInput id="name"
                                        type="text" value={data.name}
                                        className="block w-full mt-1"
                                        isFocused={true}
                                        onChange={(e) => setData("name", e.target.value)} />
                                    <InputError message={errors.name || formError.name } className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="User Email" />
                                    <TextInput id="email"
                                        type="text" value={data.email}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("email", e.target.value)} />
                                    <InputError message={errors.email || formError.email} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password" value="Password" />
                                    <TextInput id="user_password"
                                        type="password" value={data.password}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("password", e.target.value)} />
                                    <InputError message={errors.password || formError.password} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password_confirmation" value="Password Confirmation" />
                                    <TextInput id="user_password_confirmation"
                                        type="password" 
                                        value={data.password_confirmation}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("password_confirmation", e.target.value)} />
                                    <InputError message={errors.password_confirmation || formError.confirmPassword} className="mt-2" />
                                </div>
                                
                                <div className="justify-end mt-3">
                                    {progress && (
                                        <>
                                        <progress value={progress.percentage} max="100" className="w-full">
                                            
                                        </progress>

                                        <span className="px-1 py-1 text-white ">{progress.percentage}%</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex justify-between mt-4">
                                    <Link href={route("user.index")}
                                        className="h-8 px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200">Cancel
                                    </Link>
                                    <button className="h-8 px-3 py-1 text-white rounded shadow bg-emerald-500 hover:bg-emerald-600">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
