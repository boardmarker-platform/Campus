package com.woowahan.campus.attendace.domain

import org.springframework.data.repository.Repository
import java.time.LocalDate

interface AttendanceRepository : Repository<Attendance, Long> {

    fun findByCrewIdAndDateBetween(crewId: Long, from: LocalDate, to: LocalDate): List<Attendance>
}
