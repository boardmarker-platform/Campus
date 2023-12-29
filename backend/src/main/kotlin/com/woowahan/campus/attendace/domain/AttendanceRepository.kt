package com.woowahan.campus.attendace.domain

import org.springframework.data.repository.Repository

interface AttendanceRepository : Repository<Attendance, Long> {

    fun findAllByCrewId(crewId: Long): List<Attendance>
}
