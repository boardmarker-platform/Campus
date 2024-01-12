package com.woowahan.campus.zzimkkong.fixture

import com.woowahan.campus.zzimkkong.domain.DayOfWeeks.FRIDAY
import com.woowahan.campus.zzimkkong.domain.DayOfWeeks.MONDAY
import com.woowahan.campus.zzimkkong.domain.DayOfWeeks.SATURDAY
import com.woowahan.campus.zzimkkong.domain.DayOfWeeks.SUNDAY
import com.woowahan.campus.zzimkkong.domain.DayOfWeeks.THURSDAY
import com.woowahan.campus.zzimkkong.domain.DayOfWeeks.TUESDAY
import com.woowahan.campus.zzimkkong.domain.DayOfWeeks.WEDNESDAY
import com.woowahan.campus.zzimkkong.domain.Setting
import openapi.model.SpaceGetSingleSettingsInner
import openapi.model.SpaceGetSingleSettingsInnerEnabledDayOfWeek
import java.time.LocalTime

@Suppress("NonAsciiCharacters")
class SettingFixture {
    companion object {

        fun 회의실_예약_설정_1() = Setting(
            startTime = LocalTime.of(10, 0, 0),
            endTime = LocalTime.of(11, 0, 0),
            maximumMinute = 60,
            enableDays = "MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY",
        )

        fun 회의실_예약_설정_2() = Setting(
            startTime = LocalTime.of(11, 0, 0),
            endTime = LocalTime.of(12, 0, 0),
            maximumMinute = 60,
            enableDays = "MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY",
        )

        fun 회의실_예약_설정_3() = Setting(
            startTime = LocalTime.of(9, 0, 0),
            endTime = LocalTime.of(10, 0, 0),
            maximumMinute = 60,
            enableDays = "SATURDAY,SUNDAY",
        )

        fun 회의실_예약_설정_4() = Setting(
            startTime = LocalTime.of(10, 0, 0),
            endTime = LocalTime.of(18, 0, 0),
            maximumMinute = 60,
            enableDays = "MONDAY,WEDNESDAY,FRIDAY,SUNDAY",
        )

        fun `회의실 예약 설정 응답`(
            setting: Setting,
        ): SpaceGetSingleSettingsInner = SpaceGetSingleSettingsInner(
            settingStartTime = setting.startTime.toString(),
            settingEndTime = setting.endTime.toString(),
            reservationMaximumTimeUnit = setting.maximumMinute,
            enabledDayOfWeek = SpaceGetSingleSettingsInnerEnabledDayOfWeek(
                monday = setting.getEnableDays().contains(MONDAY),
                tuesday = setting.getEnableDays().contains(TUESDAY),
                wednesday = setting.getEnableDays().contains(WEDNESDAY),
                thursday = setting.getEnableDays().contains(THURSDAY),
                friday = setting.getEnableDays().contains(FRIDAY),
                saturday = setting.getEnableDays().contains(SATURDAY),
                sunday = setting.getEnableDays().contains(SUNDAY),
            )
        )
    }
}
