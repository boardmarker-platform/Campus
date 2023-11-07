package com.woowahan.campus.zzimkkong.domain

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import java.time.LocalDate

fun ReservationRepository.getById(id: Long): Reservation = findById(id) ?: throw IllegalArgumentException()

interface ReservationRepository : Repository<Reservation, Long> {
    fun save(reservation: Reservation): Reservation

    fun findById(id: Long): Reservation?

    fun findAllBySpaceIdAndDate(spaceId: Long, date: LocalDate): List<Reservation>

    fun delete(reservation: Reservation)

    @Query("select (count(r) > 0) from Reservation r")
    fun existsByStartTimeAndEndTime(): Boolean

    fun findAllBySpaceIdIn(spaceIds: List<Long>): List<Reservation>
}
