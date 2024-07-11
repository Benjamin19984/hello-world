import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
import TasksTable from '@/Components/TasksTable';

export default function Index({ auth, tasks, queryParams}) {
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Task</h2>}
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <TasksTable tasks={tasks} queryParams={queryParams} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
