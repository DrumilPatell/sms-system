import { useQuery } from '@tanstack/react-query'
import { enrollmentsApi } from '../services/api'
import { Plus, X } from 'lucide-react'

export default function EnrollmentsPage() {
  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ['enrollments'],
    queryFn: () => enrollmentsApi.getEnrollments({ limit: 100 }),
  })

  const getStatusBadge = (status) => {
    const badges = {
      active: 'badge-success',
      completed: 'badge-primary',
      dropped: 'badge-danger',
      withdrawn: 'badge-warning',
    }
    return badges[status] || 'badge-primary'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enrollments</h1>
          <p className="text-slate-600 mt-1">Manage student course enrollments</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Enrollment
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
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Course</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Enrollment Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900">{enrollment.student_name}</p>
                        <p className="text-sm text-slate-500">{enrollment.student_email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900">{enrollment.course_name}</p>
                        <p className="text-sm text-slate-500">{enrollment.course_code}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {new Date(enrollment.enrollment_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${getStatusBadge(enrollment.status)}`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {enrollments.length === 0 && (
              <p className="text-center py-12 text-slate-500">No enrollments found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
