package com.woowahan.campus.attendace.domain

import jakarta.persistence.Column
import jakarta.persistence.Embedded
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.time.LocalDate

@Entity
class Attendance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id: Long = 0L,
    private var crewId: Long,
    @Column(nullable = false)
    private var date: LocalDate,
    @Embedded
    private var checkIn: CheckIn,
    @Embedded
    private var checkOut: CheckOut,
    @Enumerated(EnumType.STRING)
    var status: AttendanceStatus,
)
