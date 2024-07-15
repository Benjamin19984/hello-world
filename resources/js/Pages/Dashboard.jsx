import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth,
    pendingTasks,
    myPendingTasks,
    completedTasks,
    myCompletedTasks,
    inprogressTasks,
    myInprogressTasks }) {
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
            </div>
        </AuthenticatedLayout>
    );
}
