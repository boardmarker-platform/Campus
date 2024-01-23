package com.woowahan.campus.attendace.domain

import java.time.LocalDateTime

data class CheckIn(
    var checkInTime: LocalDateTime,
    var checkInStatus: String,
)
