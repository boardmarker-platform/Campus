package com.woowahan.campus.zzimkkong.domain

enum class DayOfWeeks {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
    ;

    companion object {

        fun from(weekdays: List<String>): List<DayOfWeeks> {
            return weekdays.map { it.uppercase() }
                .map { day ->
                    require(values().any { it.name == day }) { "요일은 MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY 중 하나여야 합니다." }
                    valueOf(day)
                }
        }

        fun create(weekday: String): DayOfWeeks {
            return values()
                .firstOrNull { it.name == weekday.uppercase() }
                ?: throw IllegalArgumentException("유효하지 않은 요일입니다.")
        }
    }
}
