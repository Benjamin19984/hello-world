import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, task}) {
    const { data, setData, post, errors, progress, reset } = useForm({
        image:   "",
        name: task.name || "",
        status: task.status || "",
        description: task.description || "",
        due_date: task.due_date || "",
        _method: "PUT",     
    })
    const onSubmit = (e) => {
        e.preventDefault();        
        post(route("task.update",  task.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Task "{task.name}"</h2>
                    
                </div>
            }
        >
            <Head title="Task" />

            <div className="py-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">                    
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                                onSubmit={onSubmit} encType="multipart/form-data">
                                {task.image && (<div className="mb-4">
                                    <img src={task.image} alt="" className="h-64 "/>
                                </div>)}
                                <div>
                                    <InputLabel htmlFor="task_image_path" value="Task Image" />
                                    <TextInput id="task_image_path"
                                        type="file"
                                        name="image"
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("image", e.target.files[0])} />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_name" value="Task Name" />
                                    <TextInput id="task_name"
                                        type="text" value={data.name}
                                        className="block w-full mt-1"
                                        isFocused={true}
                                        onChange={(e) => setData("name", e.target.value)} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_description" value="Task Description" />
                                    <TextAreaInput id="task_description" name="description"
                                        value={data.description}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("description", e.target.value)} />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                                    <TextInput name="due_date" id="task_due_date"
                                        value={data.due_date}
                                        type="date"
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("due_date", e.target.value)}>

                                    </TextInput>
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Task Status" />
                                    <SelectInput name="status" id="task_status"
                                        value={data.status}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("status", e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                                
                                <div className="flex justify-between mt-4">
                                    <Link href={route("task.index")}
                                        className="h-8 px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200">Cancel
                                    </Link>
                                    <button className="h-8 px-3 py-1 text-white rounded shadow bg-emerald-500 hover:bg-emerald-600">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
