import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors, progress, reset } = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("project.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create New Project</h2>
                    <Link href={route('project.create')} className='px-3 py-1 text-white rounded bg-emerald-500 shawdow hovor:bg-emerald-600'>Add new</Link>
                </div>
            }
        >
            <Head title="Project" />

            <div className="py-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">                    
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                                onSubmit={onSubmit} encType="multipart/form-data">
                                <div>
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <TextInput id="project_image_path"
                                        type="file"
                                        name="image"
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("image", e.target.files[0])} />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_name" value="Project Name" />
                                    <TextInput id="project_name"
                                        type="text" value={data.name}
                                        className="block w-full mt-1"
                                        isFocused={true}
                                        onChange={(e) => setData("name", e.target.value)} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_description" value="Project Description" />
                                    <TextAreaInput id="project_description" name="description"
                                        value={data.description}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("description", e.target.value)} />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                                    <TextInput name="due_date" id="project_due_date"
                                        type="date"
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("due_date", e.target.value)}>

                                    </TextInput>
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Project Status" />
                                    <SelectInput name="status" id="project_status"
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("status", e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2" />
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
                                    <Link href={route("project.index")}
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
