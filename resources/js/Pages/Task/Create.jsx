import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, users, projects }) {
    const { data, setData, post, errors, progress, reset } = useForm({
        'name': '',
        'description': '',
        'due_date': '',
        'status': '',
        'image': '',
        'priority': '',
        'assigned_user_id': '',      
        'project_id': '',
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("task.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create New Task</h2>
                    <Link href={route('task.create')} className='px-3 py-1 text-white rounded bg-emerald-500 shawdow hovor:bg-emerald-600'>Add new</Link>
                </div>
            }
        >
            <Head title="Task" />
            {/* <span>{JSON.stringify(projects, undefined, 2)}</span> */}
            <div className="py-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                                onSubmit={onSubmit} encType="multipart/form-data">
                                <div >
                                    <InputLabel htmlFor="project_id" value="Project" />
                                    <SelectInput name="project_id" id="task_project"
                                        className="block w-full mt-1"
                                        isFocused={true}
                                        onChange={(e) => setData("project_id", e.target.value)}>
                                        <option value="">Select Project</option>
                                        {projects.data.map( project => {
                                            return <option value={project.id} key={project.id}>{project.name}</option>
                                        })}
                                    </SelectInput>
                                    <InputError message={errors.project} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_image_path" value="Task Image" />
                                    <TextInput id="task_image"
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
                                        type="date"
                                        value={data.due_date}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("due_date", e.target.value)}>

                                    </TextInput>
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Task Status" />
                                    <SelectInput name="status" id="task_status"
                                        className="block w-full mt-1"
                                        value={data.status}
                                        onChange={(e) => setData("status", e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="priority" value="Task Priority" />
                                    <SelectInput name="priority" id="task_priority"
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("priority", e.target.value)}>
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="assigned_user_id" value="Assigned User" />
                                    <SelectInput name="assigned_user_id" id="task_assigned_user_id"
                                        className="block w-full mt-1"
                                        onChange={(e) => setData("assigned_user_id", e.target.value)}>
                                        <option value="">Select User</option>
                                        {users.data.map( user => {
                                            return <option value={user.id} key={user.id}>{user.name}</option>
                                        })}
                                    </SelectInput>
                                    <InputError message={errors.assigned_user_id} className="mt-2" />
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
                                    <Link href={route("task.index")}
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
