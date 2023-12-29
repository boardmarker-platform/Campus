package com.woowahan.campus.attendace.feature

import com.woowahan.campus.attendace.domain.AttendanceRepository
import openapi.api.FindMyAttendancesApi
import openapi.model.AttendancesListResponse
import openapi.model.FindMyAttendancesResponse
import org.springframework.http.ResponseEntity
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@RestController
class FindMyAttendances(
    val attendanceRepository: AttendanceRepository
) : FindMyAttendancesApi {

    @Transactional
    override fun findMyAttendances(
        authorization: String,
        from: String,
        to: String
    ): ResponseEntity<FindMyAttendancesResponse> {
        val attendancesResponseList =
        // 크루 id는 어떻게 받아오는 것이 좋을까요?
            // argument resolver와 interceptor 가 필요한 시점일 것 같아요!
            attendanceRepository.findByCrewIdAndDateBetween(1L, LocalDate.parse(from), LocalDate.parse(to))
                .map { AttendancesListResponse(it.date.toString(), it.status.toString()) }

        return ResponseEntity.ok(FindMyAttendancesResponse(attendancesResponseList))
    }
}
