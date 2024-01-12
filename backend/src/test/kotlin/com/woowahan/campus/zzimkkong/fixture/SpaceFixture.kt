package com.woowahan.campus.zzimkkong.fixture

import com.woowahan.campus.zzimkkong.domain.Setting
import com.woowahan.campus.zzimkkong.domain.Space
import openapi.model.SpaceGetSingle

@Suppress("NonAsciiCharacters")
class SpaceFixture {

    companion object {

        fun 굿샷_강의장(campusId: Long, settings: List<Setting>) = 굿샷_강의장(campusId, false, settings)

        fun 굿샷_강의장(campusId: Long, reservationEnabled: Boolean, settings: List<Setting>) = Space(
            campusId = campusId,
            name = "굿샷 강의장",
            color = "#00000",
            area = "{ \"id\": \"2\", \"type\" : \"rect\", \"x\": \"10\", \"y\": \"20\", \"width\": \"50\", \"height\": \"70\" }",
            reservationEnabled = reservationEnabled,
            settings = settings.toMutableList()
        )

        fun 랜딩_강의장(campusId: Long, settings: List<Setting>) = 랜딩_강의장(campusId, true, settings)

        fun 랜딩_강의장(campusId: Long, reservationEnabled: Boolean, settings: List<Setting>) = Space(
            campusId = campusId,
            name = "랜딩 강의장",
            color = "#FFFFFF",
            area = "{ \"id\": \"1\", \"type\" : \"rect\", \"x\": \"10\", \"y\": \"10\", \"width\": \"30\", \"height\": \"30\" }",
            reservationEnabled = reservationEnabled,
            settings = settings.toMutableList()
        )

        fun `단일 회의실 응답`(
            space: Space
        ): SpaceGetSingle = SpaceGetSingle(
            space.id.toInt(),
            space.name,
            space.color,
            space.area,
            space.reservationEnabled,
            space.settings.map { SettingFixture.`회의실 예약 설정 응답`(it) }
        )
    }
}
