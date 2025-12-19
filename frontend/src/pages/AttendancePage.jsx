import { useQuery } from '@tanstack/react-query'
import { academicApi } from '../services/api'
import { Plus } from 'lucide-react'

export default function AttendancePage() {
  const { data: attendance = [], isLoading } = useQuery({
    queryKey: ['attendance'],
    queryFn: () => academicApi.getAttendance({ limit: 100 }),
  })

  const getStatusBadge = (status) => {
    const badges = {
      present: 'badge-success',
      absent: 'badge-danger',
      late: 'badge-warning',
      excused: 'badge-primary',
    }
    return badges[status] || 'badge-primary'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
          <p className="text-slate-600 mt-1">Track student attendance records</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Mark Attendance
        </button>
      </div>

      <div className="card">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Student ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Course ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{record.student_id}</td>
                    <td className="py-3 px-4 text-slate-600">{record.course_id}</td>
                    <td className="py-3 px-4">
                      <span className={`badge ${getStatusBadge(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{record.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {attendance.length === 0 && (
              <p className="text-center py-12 text-slate-500">No attendance records found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
