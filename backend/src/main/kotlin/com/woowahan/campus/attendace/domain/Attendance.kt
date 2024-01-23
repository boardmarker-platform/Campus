package com.woowahan.campus.attendace.domain

import jakarta.persistence.*
import java.time.LocalDate

@Entity
class Attendance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id: Long = 0L,
    private var crewId: Long,
    @Column(nullable = false)
    var date: LocalDate,
    @Embedded
    private var checkIn: CheckIn,
    @Embedded
    private var checkOut: CheckOut,
    /**
     * check in, check out 은 true, false로 하고
     * check in, out 여부와 시간으로 status를 변경해주는 로직을 만들어보면 좋을 것 같아서 이렇게 작성했습니다.
     * 어떻게 생각하시나요?
     */
    @Enumerated(EnumType.STRING)
    var status: AttendanceStatus,
)
