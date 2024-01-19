package com.woowahan.campus.zzimkkong.feature.campus

import com.woowahan.campus.support.DatabaseInitializer
import com.woowahan.campus.zzimkkong.domain.CampusRepository
import com.woowahan.campus.zzimkkong.domain.SlackChannel
import com.woowahan.campus.zzimkkong.domain.SlackChannelRepository
import com.woowahan.campus.zzimkkong.fixture.CampusFixture
import io.kotest.assertions.assertSoftly
import io.kotest.core.spec.style.BehaviorSpec
import io.kotest.matchers.equality.shouldBeEqualToComparingFields
import io.kotest.matchers.shouldBe
import io.restassured.RestAssured
import openapi.model.MapGetAll
import openapi.model.MapGetSingle
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ReadCampusTest(
    @LocalServerPort
    val port: Int,
    val campusRepository: CampusRepository,
    val slackChannelRepository: SlackChannelRepository,
    val databaseInitializer: DatabaseInitializer
) : BehaviorSpec({

    extensions(databaseInitializer)

    RestAssured.port = port

    Given("캠퍼스 정보를 등록한다.") {
        val slackUrl = "https://slackexample.com"
        val campus1 = campusRepository.save(CampusFixture.잠실_캠퍼스())
        val campus2 = campusRepository.save(CampusFixture.선릉_캠퍼스())
        slackChannelRepository.save(SlackChannel(slackUrl, campus1.id))
        slackChannelRepository.save(SlackChannel(slackUrl, campus2.id))

        When("캠퍼스 정보를 모두 조회한다.") {
            val response = RestAssured
                .given().log().all()
                .`when`().get("/api/maps")
                .then().log().all()
                .extract()
            val responseBody = response.`as`(MapGetAll::class.java)

            Then("200 응답과 저장된 캠퍼스 정보들을 반환한다.") {
                assertSoftly {
                    response.statusCode() shouldBe 200
                    responseBody shouldBeEqualToComparingFields CampusFixture.`복수 캠퍼스 응답`(
                        listOf(campus1, campus2),
                        listOf(slackUrl, slackUrl),
                    )
                }
            }
        }

        When("캠퍼스 단건 정보를 조회한다.") {
            val response = RestAssured
                .given().log().all()
                .`when`().get("/api/maps/${campus1.id}")
                .then().log().all()
                .extract()
            val responseBody = response.`as`(MapGetSingle::class.java)

            Then("200 응답과 저장된 캠퍼스 정보들을 반환한다.") {
                assertSoftly {
                    response.statusCode() shouldBe 200
                    responseBody shouldBeEqualToComparingFields CampusFixture.`단일 캠퍼스 응답`(campus1, slackUrl)
                }
            }
        }
    }
})
