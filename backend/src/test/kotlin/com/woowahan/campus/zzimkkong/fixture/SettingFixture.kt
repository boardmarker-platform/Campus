package com.woowahan.campus.zzimkkong.fixture

import com.woowahan.campus.zzimkkong.domain.DayOfWeeks
import com.woowahan.campus.zzimkkong.domain.Setting
import java.time.LocalTime

class SettingFixture {
    companion object {

        fun 회의실_예약_설정_1() = Setting(
            startTime = LocalTime.of(10, 0, 0),
            endTime = LocalTime.of(11, 0, 0),
            maximumMinute = 60,
            enableDays = mutableListOf(
                DayOfWeeks.MONDAY, DayOfWeeks.TUESDAY, DayOfWeeks.WEDNESDAY, DayOfWeeks.THURSDAY, DayOfWeeks.FRIDAY
            )
        )

        fun 회의실_예약_설정_2() = Setting(
            startTime = LocalTime.of(11, 0, 0),
            endTime = LocalTime.of(12, 0, 0),
            maximumMinute = 60,
            enableDays = mutableListOf(
                DayOfWeeks.MONDAY, DayOfWeeks.TUESDAY, DayOfWeeks.WEDNESDAY, DayOfWeeks.THURSDAY, DayOfWeeks.FRIDAY
            )
        )

        fun 회의실_예약_설정_3() = Setting(
            startTime = LocalTime.of(9, 0, 0),
            endTime = LocalTime.of(10, 0, 0),
            maximumMinute = 60,
            enableDays = mutableListOf(DayOfWeeks.SATURDAY, DayOfWeeks.SUNDAY)
        )

        fun 회의실_예약_설정_4() = Setting(
            startTime = LocalTime.of(10, 0, 0),
            endTime = LocalTime.of(18, 0, 0),
            maximumMinute = 60,
            enableDays = mutableListOf(DayOfWeeks.MONDAY, DayOfWeeks.WEDNESDAY, DayOfWeeks.FRIDAY, DayOfWeeks.SUNDAY)
        )
    }
}
