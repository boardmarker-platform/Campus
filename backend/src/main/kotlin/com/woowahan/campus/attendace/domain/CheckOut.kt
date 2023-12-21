package com.woowahan.campus.attendace.domain

import java.time.LocalDateTime

data class CheckOut(
    var checkOutTime: LocalDateTime,
    var checkOutStatus: String,
)
