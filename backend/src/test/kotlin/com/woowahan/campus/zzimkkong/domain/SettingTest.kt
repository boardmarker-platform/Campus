package com.woowahan.campus.zzimkkong.domain

import io.kotest.assertions.throwables.shouldThrow
import io.kotest.core.spec.style.StringSpec
import java.time.LocalTime

class SettingTest : StringSpec({

    "시작 시간이 종료 시간보다 빠르면 예외가 발생하지 않는다." {
        val startTime = LocalTime.of(9, 0)
        val endTime = LocalTime.of(10, 0)

        Setting(
            startTime = startTime,
            endTime = endTime,
            maximumMinute = 30,
            _enableDays = sortedSetOf(
                DayOfWeeks.MONDAY, DayOfWeeks.TUESDAY, DayOfWeeks.WEDNESDAY,
                DayOfWeeks.THURSDAY, DayOfWeeks.FRIDAY, DayOfWeeks.SATURDAY, DayOfWeeks.SUNDAY
            )
        )
    }

    "시작 시간이 종료 시간보다 늦으면 예외가 발생한다." {
        val startTime = LocalTime.of(10, 0)
        val endTime = LocalTime.of(9, 0)

        shouldThrow<IllegalArgumentException> {
            Setting(
                startTime = startTime,
                endTime = endTime,
                maximumMinute = 30,
                _enableDays = sortedSetOf(
                    DayOfWeeks.MONDAY, DayOfWeeks.TUESDAY, DayOfWeeks.WEDNESDAY,
                    DayOfWeeks.THURSDAY, DayOfWeeks.FRIDAY, DayOfWeeks.SATURDAY, DayOfWeeks.SUNDAY
                )
            )
        }
    }

    "시작 시간과 종료 시간이 같으면 예외가 발생한다." {
        val startTime = LocalTime.of(9, 0)
        val endTime = LocalTime.of(9, 0)

        shouldThrow<IllegalArgumentException> {
            Setting(
                startTime = startTime,
                endTime = endTime,
                maximumMinute = 30,
                _enableDays = sortedSetOf(
                    DayOfWeeks.MONDAY, DayOfWeeks.TUESDAY, DayOfWeeks.WEDNESDAY,
                    DayOfWeeks.THURSDAY, DayOfWeeks.FRIDAY, DayOfWeeks.SATURDAY, DayOfWeeks.SUNDAY
                )
            )
        }
    }
})
