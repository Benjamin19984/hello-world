import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth,
    pendingTasks,
    myPendingTasks,
    completedTasks,
    myCompletedTasks,
    inprogressTasks,
    myInprogressTasks,
    activeTasks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 gap-2 grid grid-cols-3">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900 dark:text-gray-100 ">
                            {/* <span>{JSON.stringify(activeTasks, undefined)}</span> */}

                            <h3 className='text-2xl text-amber-500 rounded font-semibold'>Pending</h3>
                            <p className='text-xl mt-4'>
                                <span className='mr-2'>{pendingTasks}</span> /
                                <span className='ml-2'>{myPendingTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 ">
                            <h3 className='text-2xl text-green-500 rounded font-semibold'>In progress</h3>
                            <p className='text-xl mt-4'>
                                <span className='mr-2'>{inprogressTasks}</span> /
                                <span className='ml-2'>{myInprogressTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-2xl text-blue-500 rounded font-semibold'>completed</h3>
                            <p className='text-xl mt-4'>
                                <span className='mr-2'>{completedTasks}</span> /
                                <span className='ml-2'>{myCompletedTasks}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 gap-2  mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 ">
                            {/* <h3>here</h3> */}
                            <table className="w-full text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className='text-gray-600 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                    <tr>
                                        <th className='px-3 py-2'>ID</th>
                                        <th className='px-3 py-2'>Project name</th>
                                        <th className='px-3 py-2'>Name</th>
                                        <th className='px-3 py-2'>Status</th>
                                        <th className='px-3 py-2'>Due date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTasks?.data?.map(task => (
                                        <tr key={task.id}>
                                            <td className='px-3 py-2'>{task.id}</td>
                                            <td className='px-3 py-2'>{task.project.name}</td>
                                            <td className='px-3 py-2'>{task.name}</td>
                                            <td className='px-3 py-2 text-nowrap'>
                                                <span className={'px-2 py-1 rounded text-white ' + TASK_STATUS_CLASS_MAP[task.status.replace(" ", "_")]}> {TASK_STATUS_TEXT_MAP[task.status.replace(" ", "_")]}</span>
                                            </td>
                                            <td className='px-3 py-2'>{task.due_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
