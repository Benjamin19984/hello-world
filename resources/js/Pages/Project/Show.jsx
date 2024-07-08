import TasksTable from '@/Components/TasksTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constant';
import { Head } from '@inertiajs/react';

export default function Show({ auth, project, tasks, queryParams = null }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">{`Project "${project.name}"`}</h2>}
        >
            <Head title={`Project ${project.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div>
                            <img src="project.image_url"
                                alt=""
                                className='w-full h-64 object-cover'
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">

                            <div className='grid gap-1 grid-cols-2'>
                                <div>
                                    <div>
                                        <label className='font-bold, text-lg'>
                                            Project ID
                                            <p className='mt-1'>{project.id}</p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Project Name
                                            <p className='mt-1'>{project.name}</p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg '>
                                            Project Status
                                            <p className='mt-1'>
                                                <span className={'px-2 py-1 rounded text-white ' + PROJECT_STATUS_CLASS_MAP[project.status.replace(" ", "_")]}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status.replace(" ", "_")]}
                                                </span>
                                            </p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Project Created By
                                            <p className='mt-1'>{project.createdBy.name}</p>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Due date
                                            <p className='mt-1'>{project.due_date}</p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Created Date
                                            <p className='mt-1'>{project.created_at}</p>
                                        </label>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold, text-lg'>
                                            Updated By
                                            <p className='mt-1'>{project.updatedBy.name}</p>
                                        </label>
                                    </div>

                                </div>

                            </div>
                            <div className='mt-4'>
                                <label className='font-bold text-lg'>
                                    Project Description
                                </label>
                                <p>{project.description}</p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className="px-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <TasksTable tasks={tasks} queryParams={queryParams} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )

}