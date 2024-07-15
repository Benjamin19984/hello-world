import { useCallback, useState } from 'react';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant';
import TableHeading from '@/Components/TableHeading';
import { Link, router } from '@inertiajs/react';

export default function TasksTable({ tasks, queryParams: initialQueryParams = {}, success = null }) {

    const [queryParams, setQueryParams] = useState(initialQueryParams)

    const searchFieldChanged = useCallback((name, value) => {
        setQueryParams(prevParams => {
            const newParams = { ...prevParams, [name]: value || undefined }
            router.get(route('task.index'), newParams)
            return newParams;
        })
    }, [])

    const KeyPress = useCallback((name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value)
    }, [searchFieldChanged])

    const sortChanged = useCallback((name) => {
        setQueryParams(prevParams => {
            const sortDirection = prevParams.sort_field === name && prevParams.sort_direction === 'asc' ? 'desc' : 'asc';
            const newParams = { ...prevParams, sort_field: name, sort_direction: sortDirection };
            router.get(route("task.index"), newParams);
            return newParams;
        });
    }, []);

    const handleDelete = (id, e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure want to delete this task?")) {
            return;
        }
        router.delete(route('task.destroy', id));
    }
    return (
        <div className="p-6 text-gray-900 dark:text-gray-100">
            {success && (<div className="px-4 py-2 mb-6 text-white rounded shadow bg-emerald-500">
                {success}
            </div>)}
            <table className="w-full text-left text-gray-500 rtl:text-right dark:text-gra-400">
                <thead className='text-gray-600 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr className='text-nowrap'>
                        <TableHeading name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}>
                            ID
                        </TableHeading>
                        <th className='px-3 py-3'>Image</th>
                        <TableHeading name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}>
                            Name
                        </TableHeading>
                        <TableHeading name="status"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}>
                            Status
                        </TableHeading>
                        <TableHeading name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}>
                            CreatedAt
                        </TableHeading>
                        <TableHeading name="due_date"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}>
                            Due Date
                        </TableHeading>
                        <th className='px-3 py-3'>CreatedBy</th>
                        <th className='px-3 py-3'>Actions</th>
                    </tr>
                </thead>
                <thead className='text-xs text-gray-600 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr className='text-nowrap'>
                        <th className='px-3 py-3'></th>
                        <th className='px-3 py-3'></th>
                        <th className='px-3 py-3'>
                            <TextInput className="w-full " placeholder="Task Name"
                                defaultValue={queryParams.name}
                                onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                onKeyPress={e => KeyPress('name', e)} />
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
                <tbody >
                    {tasks.data.map((task) => (
                        <tr key={task.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td className='px-3 py-2'>{task.id}</td>
                            <td className='px-3 py-2' style={{ witdth: 60 }}>
                                <img src={task.image_path} alt='task.image_path' className='size-12' />
                            </td>
                            <th className='px-3 py-2 text-gray-100 hover:underline '>
                                <Link href={route('task.show', task.id)}>{task.name}</Link>
                            </th>
                            <td className='px-3 py-2 text-nowrap'>
                                <span className={'px-2 py-1 rounded text-white ' + TASK_STATUS_CLASS_MAP[task.status.replace(" ", "_")]}> {TASK_STATUS_TEXT_MAP[task.status.replace(" ", "_")]}</span>
                            </td>
                            <td className='px-3 py-2 text-nowrap'>{task.created_at}</td>
                            <td className='px-3 py-2 text-nowrap'>{task.due_date}</td>
                            <td className='px-3 py-2'>{task.createdBy.name}</td>
                            <td className='px-3 py-2 text-nowrap'>
                                <Link href={route('task.edit', task.id)}
                                    className='mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                                    Edit
                                </Link>
                                <button onClick={(e) => handleDelete(task.id, e)}
                                    className='mx-1 font-medium text-red-600 dark:text-red-500 hover:underline'>
                                    Delete
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
            <Pagination links={tasks.meta.links} queryParams={queryParams} />
        </div>
    )
}