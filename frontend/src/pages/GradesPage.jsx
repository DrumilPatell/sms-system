import { useQuery } from '@tanstack/react-query'
import { academicApi } from '../services/api'
import { Plus } from 'lucide-react'

export default function GradesPage() {
  const { data: grades = [], isLoading } = useQuery({
    queryKey: ['grades'],
    queryFn: () => academicApi.getGrades({ limit: 100 }),
  })

  const getGradeBadge = (percentage) => {
    if (percentage >= 90) return 'badge-success'
    if (percentage >= 80) return 'badge-primary'
    if (percentage >= 70) return 'badge-warning'
    return 'badge-danger'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Grades</h1>
          <p className="text-slate-600 mt-1">Manage student grades and assessments</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Grade
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
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Assessment</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Student ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Percentage</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900">{grade.assessment_name}</p>
                      {grade.date_assessed && (
                        <p className="text-sm text-slate-500">
                          {new Date(grade.date_assessed).toLocaleDateString()}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge-primary capitalize">{grade.assessment_type}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{grade.student_id}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {grade.score} / {grade.max_score}
                    </td>
                    <td className="py-3 px-4">
                      {grade.percentage && (
                        <span className={`badge ${getGradeBadge(grade.percentage)}`}>
                          {grade.percentage.toFixed(1)}%
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {grade.letter_grade && (
                        <span className="font-semibold text-slate-900">{grade.letter_grade}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {grades.length === 0 && (
              <p className="text-center py-12 text-slate-500">No grades found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
