package com.woowahan.campus.zzimkkong.domain

import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.time.LocalTime
import java.util.SortedSet

@Entity
class Setting(
    val startTime: LocalTime,
    val endTime: LocalTime,
    val maximumMinute: Int,
    @Convert(converter = DayOfWeeksConverter::class)
    @Column(name = "enable_days")
    val _enableDays: SortedSet<DayOfWeeks>,
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0L,
) {

    val enableDays: List<DayOfWeeks>
        get() = _enableDays.toList()

    val enableDays2: Set<DayOfWeeks>
        get() = _enableDays.toSet()

    init {
        validateTime(startTime, endTime)
    }

    private fun validateTime(startTime: LocalTime, endTime: LocalTime) {
        require(startTime < endTime) { "시작 시간이 종료 시간보다 늦을 수 없습니다." }
        require(startTime != endTime) { "시작 시간과 종료 시간이 같을 수 없습니다." }
    }

    fun isEnableTime(startTime: LocalTime, endTime: LocalTime): Boolean {
        return (this.startTime <= startTime) &&
            (this.endTime >= endTime) &&
            (startTime.plusMinutes(this.maximumMinute.toLong()) >= endTime)
    }
}
