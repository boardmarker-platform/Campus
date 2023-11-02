package com.woowahan.campus.zzimkkong.feature.space

import com.woowahan.campus.zzimkkong.domain.DayOfWeeks
import com.woowahan.campus.zzimkkong.domain.Setting
import com.woowahan.campus.zzimkkong.domain.SettingRepository
import com.woowahan.campus.zzimkkong.domain.Space
import com.woowahan.campus.zzimkkong.domain.SpaceRepository
import openapi.api.FindSpaceApi
import openapi.model.SpaceGetSingle
import openapi.model.SpaceGetSingleSettingsInner
import openapi.model.SpaceGetSingleSettingsInnerEnabledDayOfWeek
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class ReadSpace(
    val spaceRepository: SpaceRepository,
    val settingRepository: SettingRepository,
) : FindSpaceApi {

    override fun findAllSpace(mapId: Int): ResponseEntity<List<SpaceGetSingle>> {
        val spaces = spaceRepository.findAllByCampusId(mapId.toLong())

        return ResponseEntity.ok(
            spaces.map {
                val settings = settingRepository.findSettingsBySpaceId(spaceId = it.id)
                createSpaceSingleResponse(it, settings)
            }.toList()
        )
    }

    override fun findSpace(mapId: Int, spaceId: Int): ResponseEntity<SpaceGetSingle> {
        val space = spaceRepository.findById(spaceId.toLong())
            .orElseThrow { IllegalArgumentException() }
        val settings = settingRepository.findSettingsBySpaceId(spaceId = spaceId.toLong())

        return ResponseEntity.ok(
            createSpaceSingleResponse(space, settings)
        )
    }

    private fun createSpaceSingleResponse(space: Space, settings: List<Setting>) = SpaceGetSingle(
        name = space.name,
        color = space.color,
        area = space.area,
        reservationEnable = space.reservationEnabled,
        settings = parseToSettingResponses(settings),
    )

    private fun parseToSettingResponses(settings: List<Setting>): List<SpaceGetSingleSettingsInner> = settings.map {
        SpaceGetSingleSettingsInner(
            settingStartTime = it.startTime.toString(),
            settingEndTime = it.endTime.toString(),
            reservationMaximumTimeUnit = it.maximumMinute,
            enabledDayOfWeek = SpaceGetSingleSettingsInnerEnabledDayOfWeek(
                monday = it.getEnableDays().contains(DayOfWeeks.MONDAY),
                tuesday = it.getEnableDays().contains(DayOfWeeks.TUESDAY),
                wednesday = it.getEnableDays().contains(DayOfWeeks.WEDNESDAY),
                thursday = it.getEnableDays().contains(DayOfWeeks.THURSDAY),
                friday = it.getEnableDays().contains(DayOfWeeks.FRIDAY),
                saturday = it.getEnableDays().contains(DayOfWeeks.SATURDAY),
                sunday = it.getEnableDays().contains(DayOfWeeks.SUNDAY),
            )
        )
    }.toList()
}
