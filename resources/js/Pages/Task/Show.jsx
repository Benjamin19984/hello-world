import TasksTable from '@/Components/TasksTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant';
import { Head } from '@inertiajs/react';

export default function Show({ auth, task, tasks, queryParams = null }) {
    console.log(tasks)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">{`Task "${task.name}"`}</h2>}
        >
            <Head title={`Task ${task.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div>
                            <img src={task.image}
                                alt={task.image}
                                className='object-cover w-full '
                            />
                        </div>
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">

                            <div className='grid grid-cols-2 gap-1'>
                                <div>
                                    <div>
                                        <label className='font-bold, text-lg'>
                                            Task ID
                                            <p className='mt-1'>{task.id}</p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Task Name
                                            <p className='mt-1'>{task.name}</p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg '>
                                            Task Status
                                            <p className='mt-1'>
                                                <span className={'px-2 py-1 rounded text-white ' + TASK_STATUS_CLASS_MAP[task.status.replace(" ", "_")]}>
                                                    {TASK_STATUS_TEXT_MAP[task.status.replace(" ", "_")]}
                                                </span>
                                            </p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Task Created By
                                            <p className='mt-1'>{task.createdBy.name}</p>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Due date
                                            <p className='mt-1'>{task.due_date}</p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Created Date
                                            <p className='mt-1'>{task.created_at}</p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Updated By
                                            <p className='mt-1'>{task.updatedBy.name}</p>
                                        </label>
                                    </div>

                                </div>

                            </div>
                            <div className='mt-4'>
                                <label className='text-lg font-bold'>
                                    Task Description
                                </label>
                                <p>{task.description}</p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
            { tasks && (<div className="px-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <TasksTable tasks={tasks} queryParams={queryParams} />
                        </div>
                    </div>
                </div>
            </div>)}            
        </AuthenticatedLayout>
    )

}