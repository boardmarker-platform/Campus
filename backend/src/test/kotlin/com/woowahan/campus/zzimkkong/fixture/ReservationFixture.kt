package com.woowahan.campus.zzimkkong.fixture

import com.woowahan.campus.zzimkkong.domain.Reservation
import openapi.model.ReservationGetSingle
import openapi.model.ReservationsGet
import openapi.model.ReservationsGetReservationsInner
import java.time.LocalDate
import java.time.LocalTime

@Suppress("NonAsciiCharacters")
class ReservationFixture {

    companion object {

        fun 회의실_예약(
            date: String,
            startTime: String,
            endTime: String,
        ): Reservation {
            return 회의실_예약(0L, date, startTime, endTime)
        }

        fun 회의실_예약(
            spaceId: Long,
            date: String,
            startTime: String,
            endTime: String,
        ): Reservation {
            return 회의실_예약(spaceId, date, startTime, endTime, "1234")
        }

        fun 회의실_예약(
            spaceId: Long,
            date: String,
            startTime: String,
            endTime: String,
            password: String,
        ): Reservation {
            return Reservation(
                spaceId = spaceId,
                date = LocalDate.parse(date),
                startTime = LocalTime.parse(startTime),
                endTime = LocalTime.parse(endTime),
                name = "회의실 예약",
                description = "회의실 예약 설명",
                password = password
            )
        }

        fun `단일 예약 응답`(reservation: Reservation): ReservationGetSingle = ReservationGetSingle(
            id = reservation.id.toInt(),
            startDateTime = "${reservation.date}T${reservation.startTime}",
            endDateTime = "${reservation.date}T${reservation.endTime}",
            name = reservation.name,
            description = reservation.description,
        )

        fun `복수 예약 응답`(reservations: List<Reservation>): ReservationsGet = ReservationsGet(
            reservations = reservations.map {
                ReservationsGetReservationsInner(
                    id = it.id.toInt(),
                    startDateTime = "${it.date}T${it.startTime}",
                    endDateTime = "${it.date}T${it.endTime}",
                    name = it.name,
                    description = it.description,
                )
            }
        )
    }
}
