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
        fun from(weekday: String): DayOfWeeks {
            return values()
                .firstOrNull { it.name == weekday.uppercase() }
                ?: throw IllegalArgumentException("유효하지 않은 요일입니다.")
        }
    }
}
