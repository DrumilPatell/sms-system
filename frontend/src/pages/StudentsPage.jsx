import { useQuery } from '@tanstack/react-query'
import { studentsApi } from '../services/api'
import { Edit, Trash2, UserPlus, Mail, Phone } from 'lucide-react'

export default function StudentsPage() {
  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: () => studentsApi.getStudents({ limit: 100 }),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-600 mt-1">Manage student profiles and academic information</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {students.map((student) => (
              <div key={student.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary-700">
                        {student.full_name?.charAt(0) || 'S'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{student.full_name}</h3>
                      <p className="text-sm text-slate-500">{student.student_id}</p>
                    </div>
                  </div>
                  <span className={`badge ${student.is_active ? 'badge-success' : 'badge-danger'}`}>
                    {student.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="w-4 h-4" />
                    {student.email}
                  </div>
                  {student.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="w-4 h-4" />
                      {student.phone}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500">Program</p>
                    <p className="text-sm font-medium text-slate-900">{student.program || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">GPA</p>
                    <p className="text-sm font-medium text-slate-900">
                      {student.gpa ? student.gpa.toFixed(2) : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button className="flex-1 btn-secondary text-sm flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {!isLoading && students.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-slate-500">No students found</p>
        </div>
      )}
    </div>
  )
}
