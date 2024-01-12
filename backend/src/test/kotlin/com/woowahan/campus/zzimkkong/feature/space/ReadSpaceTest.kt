package com.woowahan.campus.zzimkkong.feature.space

import com.woowahan.campus.support.DatabaseInitializer
import com.woowahan.campus.zzimkkong.domain.CampusRepository
import com.woowahan.campus.zzimkkong.domain.SpaceRepository
import com.woowahan.campus.zzimkkong.fixture.CampusFixture
import com.woowahan.campus.zzimkkong.fixture.SettingFixture.Companion.회의실_예약_설정_1
import com.woowahan.campus.zzimkkong.fixture.SettingFixture.Companion.회의실_예약_설정_3
import com.woowahan.campus.zzimkkong.fixture.SpaceFixture
import io.kotest.core.spec.style.BehaviorSpec
import io.kotest.matchers.equality.shouldBeEqualToComparingFields
import io.kotest.matchers.shouldBe
import io.restassured.RestAssured
import openapi.model.SpaceGetAll
import openapi.model.SpaceGetSingle
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ReadSpaceTest(
    @LocalServerPort
    val port: Int,
    val campusRepository: CampusRepository,
    val spaceRepository: SpaceRepository,
    val databaseInitializer: DatabaseInitializer,
) : BehaviorSpec({

    extensions(databaseInitializer)

    RestAssured.port = port

    Given("회의실 정보를 등록한다.") {
        val campus = campusRepository.save(CampusFixture.잠실_캠퍼스())
        val settings = listOf(회의실_예약_설정_1(), 회의실_예약_설정_3())
        val space = spaceRepository.save(SpaceFixture.랜딩_강의장(campus.id, settings))

        When("회의실 정보를 모두 조회한다.") {
            val response = RestAssured
                .given().log().all()
                .`when`().get("/api/maps/${campus.id}/spaces")
                .then().log().all()
                .extract()
            val responseBody = response.`as`(SpaceGetAll::class.java)

            Then("200 응답과 저장된 회의실 정보들을 반환한다.") {
                response.statusCode() shouldBe 200
                responseBody shouldBeEqualToComparingFields SpaceFixture.`복수 회의실 응답`(listOf(space))
            }
        }

        When("회의실 단건 정보를 조회한다.") {
            val response = RestAssured
                .given().log().all()
                .`when`().get("/api/maps/${campus.id}/spaces/${space.id}")
                .then().log().all()
                .extract()
            val responseBody = response.`as`(SpaceGetSingle::class.java)

            Then("200 응답과 저장된 회의실 정보들을 반환한다.") {
                response.statusCode() shouldBe 200
                responseBody shouldBeEqualToComparingFields SpaceFixture.`단일 회의실 응답`(space)
            }
        }
    }
})
