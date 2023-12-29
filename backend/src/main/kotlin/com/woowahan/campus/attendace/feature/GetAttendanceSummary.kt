package com.woowahan.campus.attendace.feature

import com.woowahan.campus.attendace.domain.AttendanceRepository
import com.woowahan.campus.attendace.domain.AttendanceStatus
import openapi.api.GetAttendanceSummaryApi
import openapi.model.GetAttendanceSummaryResponse
import org.springframework.http.ResponseEntity
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.RestController

@RestController
class GetAttendanceSummary(
    private val attendanceRepository: AttendanceRepository
) : GetAttendanceSummaryApi {

    @Transactional(readOnly = true)
    override fun getAttendaceSummary(
        authorization: String
    ): ResponseEntity<GetAttendanceSummaryResponse> {
        val attendances = attendanceRepository.findAllByCrewId(1L)
        val attendanceCountByStatus = attendances.groupingBy { it.status }.eachCount()
        val attendanceSummaryResponse = GetAttendanceSummaryResponse(
            attendanceCountByStatus.getOrDefault(AttendanceStatus.TARDINESS, 0),
            attendanceCountByStatus.getOrDefault(AttendanceStatus.ABSENCE, 0),
            attendanceCountByStatus.getOrDefault(AttendanceStatus.NO_LEAVE, 0),
        )
        return ResponseEntity.ok(attendanceSummaryResponse)
    }
}
