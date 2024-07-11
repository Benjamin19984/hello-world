import { useState, useCallback } from 'react';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constant';
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from '@/Components/TableHeading';

export default function Index({ auth, projects, queryParams: initialQueryParams = {}, success }) {
    const [queryParams, setQueryParams] = useState(initialQueryParams);
    const searchFieldChanged = useCallback((name, value) => {
        setQueryParams(prevParams => {
            const newParams = { ...prevParams, [name]: value || undefined };
            router.get(route("project.index"), newParams);
            return newParams;
        });
    }, []);

    const keyPressHandler = useCallback((name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }, [searchFieldChanged]);

    const sortChanged = useCallback((name) => {
        setQueryParams(prevParams => {
            const sortDirection = prevParams.sort_field === name && prevParams.sort_direction === 'asc' ? 'desc' : 'asc';
            const newParams = { ...prevParams, sort_field: name, sort_direction: sortDirection };
            router.get(route("project.index"), newParams);
            return newParams;
        });
    }, []);

    const handleDelete =(id) => {
        if (! window.confirm("Are you sure you want to delete the project")){
            return;
        }
        router.delete(route('project.destroy', id))
    }

    const handleUpdate = (id) => {
        router.get(route('project.edit', id))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Project</h2>
                    <Link href={route('project.create')} className='px-3 py-1 text-white rounded bg-emerald-500 shawdow hovor:bg-emerald-600'>Add new</Link>
                </div>
            }
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                    {success && (<div className="px-4 py-2 mb-6 text-white rounded shadow bg-emerald-500">
                        {success}
                    </div>)}
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <table className="w-full text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className='text-gray-600 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                    <tr className='p-12 text-nowrap'>
                                        <TableHeading name="id" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>ID</TableHeading>
                                        <th className='px-3 py-3'>Image</th>
                                        <TableHeading name="name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Name</TableHeading>
                                        <TableHeading name="status" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Status</TableHeading>
                                        <TableHeading name="created_at" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Created At</TableHeading>
                                        <TableHeading name="due_date" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Due Date</TableHeading>
                                        <th className='px-3 py-3'>Created By</th>
                                        <th className='px-3 py-3'>Actions</th>
                                    </tr>
                                </thead>
                                <thead className='text-xs text-gray-600 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                    <tr className='text-nowrap'>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'>
                                            <TextInput className="w-full" placeholder="Project Name" defaultValue={queryParams.name} onBlur={(e) => searchFieldChanged('name', e.target.value)} onKeyPress={(e) => keyPressHandler('name', e)} />
                                        </th>
                                        <th className='px-3 py-3'>
                                            <SelectInput className="w-full "
                                                defaultValue={queryParams.status}
                                                onChange={(e) => searchFieldChanged('status', e.target.value)} >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr key={project.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                            <td className='px-3 py-2'>{project.id}</td>
                                            <td className='px-3 py-2 ' >
                                                <img src={project.image} alt={project.image} className='size-10' />
                                            </td>
                                            <th className='px-3 py-2 text-gray-100 hover:underline text-nowrap'>
                                                <Link href={route('project.show', project.id)}>{project.name}</Link>
                                            </th>
                                            <td className='px-3 py-2 text-nowrap'>
                                                <span className={'px-2 py-1 rounded text-white ' + PROJECT_STATUS_CLASS_MAP[project.status.replace(" ", "_")]}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status.replace(" ", "_")]}
                                                </span>
                                            </td>
                                            <td className='px-3 py-2 text-nowrap'>{project.created_at}</td>
                                            <td className='px-3 py-2 text-nowrap'>{project.due_date}</td>
                                            <td className='px-3 py-2'>{project.createdBy.name}</td>
                                            <td className='px-3 py-2'>
                                                <button onClick={(e) => handleUpdate(project.id)} className='mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</button>
                                                <button onClick={(e) => handleDelete(project.id)} className='mx-1 font-medium text-red-600 dark:text-red-500 hover:underline'>Delete</button >
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links} queryParams={queryParams} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}
